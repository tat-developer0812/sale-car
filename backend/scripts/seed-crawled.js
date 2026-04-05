/**
 * Seed Strapi with crawled data from bonbanh.com
 * Usage: node scripts/seed-crawled.js
 *
 * Prerequisites:
 * 1. Strapi must be running at http://localhost:1337
 * 2. data/brands.json and data/cars.json must exist (run crawl-bonbanh.js first)
 * 3. Set STRAPI_TOKEN env or use the token from frontend/.env.local
 */

const fs = require("fs");
const path = require("path");
const { Blob } = require("buffer");

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN =
  process.env.STRAPI_TOKEN ||
  "b1f8920755900d261b386e5ccbbf0e4f47aa0b89a917de3d41f20a6c6083fffd53c7716fea50e609712c177aa33e8db8b3180a706183c691e378ac7218a8522cf44095c11b8d33d153f484e559e1ccf16d9531290b391920bad6f7c5297194fd1e7975579926381457edc645d10f41f7244f80ce8fa52b7594cf4b17d0e0d210";

const DATA_DIR = path.join(__dirname, "..", "data");
const LOGOS_DIR = path.join(DATA_DIR, "logos");

const DELAY_MS = 200;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Top brands to prioritize (most popular in Vietnam)
const TOP_BRANDS = [
  "toyota", "hyundai", "kia", "ford", "honda", "mazda",
  "mitsubishi", "vinfast", "mercedes_benz", "bmw",
  "peugeot", "mg", "suzuki", "volkswagen", "lexus",
  "audi", "volvo", "subaru", "nissan", "isuzu",
  "byd", "geely", "skoda", "landrover", "porsche",
  "mini", "jeep", "wuling", "haval", "gac",
];

async function fetchAPI(endpoint, options = {}) {
  const headers = {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
    ...options.headers,
  };

  // Don't set Content-Type for FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${STRAPI_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || `API ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

// Upload a buffer to Strapi using native FormData
async function uploadBuffer(buffer, fileName, mimeType = "image/png") {
  const blob = new Blob([buffer], { type: mimeType });
  const form = new FormData();
  form.append("files", blob, fileName);

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: form,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  return data[0];
}

// Upload a local file to Strapi
async function uploadFile(filePath, fileName) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(fileName).toLowerCase();
  const mimeType = ext === ".png" ? "image/png" : "image/jpeg";
  return uploadBuffer(buffer, fileName, mimeType);
}

// Upload image from URL to Strapi
async function uploadFromUrl(imageUrl, fileName) {
  try {
    const res = await fetch(imageUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return null;

    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") || "image/jpeg";

    return await uploadBuffer(buffer, fileName, contentType);
  } catch (err) {
    return null;
  }
}

// ─── Seed Brands ───
async function seedBrands() {
  console.log("\n=== SEEDING BRANDS ===");
  const brands = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, "brands.json"), "utf-8")
  );

  // Filter to top brands first, then add rest
  const sorted = [
    ...brands.filter((b) => TOP_BRANDS.includes(b.slug)),
    ...brands.filter((b) => !TOP_BRANDS.includes(b.slug)),
  ];

  const brandMap = {}; // slug -> strapi ID

  for (let i = 0; i < sorted.length; i++) {
    const brand = sorted[i];
    process.stdout.write(`  [${i + 1}/${sorted.length}] ${brand.name}... `);

    try {
      // Check if exists
      const existing = await fetchAPI(
        `/api/brands?filters[slug][$eq]=${brand.slug}`
      );

      let brandId;

      if (existing.data && existing.data.length > 0) {
        brandId = existing.data[0].documentId;
        console.log("exists");
      } else {
        // Create brand
        const created = await fetchAPI("/api/brands", {
          method: "POST",
          body: JSON.stringify({
            data: {
              name: brand.name,
              slug: brand.slug,
              description: `${brand.name} - Thương hiệu xe ô tô tại Việt Nam. Xem giá xe ${brand.name} mới nhất tại VuKia.`,
            },
          }),
        });
        brandId = created.data.documentId;

        // Upload logo
        if (brand.logoFile) {
          const logoPath = path.join(LOGOS_DIR, brand.logoFile);
          if (fs.existsSync(logoPath)) {
            try {
              const uploaded = await uploadFile(logoPath, `${brand.slug}-logo.png`);
              // Link logo to brand
              await fetchAPI(`/api/brands/${brandId}`, {
                method: "PUT",
                body: JSON.stringify({
                  data: { logo: uploaded.id },
                }),
              });
              process.stdout.write("+ logo ");
            } catch {
              process.stdout.write("(logo fail) ");
            }
          }
        }

        console.log("created");
      }

      brandMap[brand.slug] = brandId;
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }

    await sleep(DELAY_MS);
  }

  return brandMap;
}

// ─── Seed Cars ───
async function seedCars(brandMap) {
  console.log("\n=== SEEDING CARS ===");
  const allCars = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, "cars.json"), "utf-8")
  );

  // Prioritize: listing cars with images first, then table entries
  const listingCars = allCars.filter((c) => c.source === "listing" && c.imageUrl);
  const tableCars = allCars.filter((c) => c.source === "table");

  // Only seed listing cars (they have images and more data)
  // For table cars, we'd need to skip mainImage requirement or use a placeholder
  const carsToSeed = listingCars;

  console.log(`  Total listing cars to seed: ${carsToSeed.length}`);
  console.log(`  (Skipping ${tableCars.length} table entries without images)\n`);

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < carsToSeed.length; i++) {
    const car = carsToSeed[i];
    process.stdout.write(
      `  [${i + 1}/${carsToSeed.length}] ${car.name.substring(0, 45)}... `
    );

    try {
      // Check if exists
      const existing = await fetchAPI(
        `/api/cars?filters[slug][$eq]=${car.slug}`
      );

      if (existing.data && existing.data.length > 0) {
        console.log("exists");
        skipped++;
        continue;
      }

      // Upload main image
      let mainImageId = null;
      if (car.imageUrl) {
        const imgName = `${car.slug}-main.jpg`;
        const uploaded = await uploadFromUrl(car.imageUrl, imgName);
        if (uploaded) mainImageId = uploaded.id;
      }

      if (!mainImageId) {
        console.log("skip (no image)");
        skipped++;
        continue;
      }

      // Build specs component
      const specs = {};
      if (car.specs) {
        if (car.specs.engine) specs.engine = car.specs.engine;
        if (car.specs.power) specs.power = car.specs.power;
        if (car.specs.seats) specs.seats = car.specs.seats;
        if (car.specs.doors) specs.doors = car.specs.doors || undefined;
        if (car.specs.driveType) specs.driveType = car.specs.driveType;
        if (car.specs.fuelConsumption) specs.fuelConsumption = car.specs.fuelConsumption;
      }

      // Build car data
      const brandDocId = brandMap[car.brandSlug];
      const shortDesc =
        car.fullDescription?.substring(0, 290) ||
        car.shortDescription ||
        `${car.name} - Xe ${car.brandName} chính hãng tại VuKia. Giá ${car.priceText}. Hỗ trợ trả góp, bảo hành chính hãng.`;

      const carData = {
        name: car.name,
        slug: car.slug,
        price: car.price,
        year: car.year,
        status: car.status || "available",
        stockCount: 1,
        category: car.category || "sedan",
        fuelType: car.fuelType || "gasoline",
        transmission: car.transmission || "automatic",
        shortDescription: shortDesc.substring(0, 300),
        fullDescription: car.fullDescription || `<p>${shortDesc}</p>`,
        mainImage: mainImageId,
        views: Math.floor(Math.random() * 500) + 50,
        specs: Object.keys(specs).length > 0 ? specs : undefined,
        colors: car.specs?.exteriorColor
          ? { exterior: car.specs.exteriorColor, interior: car.specs.interiorColor }
          : undefined,
      };

      // Add brand relation
      if (brandDocId) {
        carData.brand = brandDocId;
      }

      await fetchAPI("/api/cars", {
        method: "POST",
        body: JSON.stringify({ data: carData }),
      });

      console.log("OK");
      created++;
    } catch (err) {
      console.log(`FAIL: ${err.message.substring(0, 80)}`);
      failed++;
    }

    await sleep(DELAY_MS);
  }

  return { created, skipped, failed };
}

// ─── Main ───
async function main() {
  console.log("🚗 VuKia Seed Script - Crawled Data");
  console.log("====================================");
  console.log(`Strapi: ${STRAPI_URL}`);
  console.log(`Token: ${STRAPI_TOKEN ? "OK" : "MISSING"}\n`);

  // Test connection
  try {
    await fetch(`${STRAPI_URL}/api/brands`);
    console.log("✅ Strapi connection OK");
  } catch {
    console.error("❌ Cannot connect to Strapi at", STRAPI_URL);
    process.exit(1);
  }

  // Seed brands
  const brandMap = await seedBrands();
  console.log(`\nBrand map: ${Object.keys(brandMap).length} brands`);

  // Seed cars
  const result = await seedCars(brandMap);

  console.log("\n=== SEED COMPLETE ===");
  console.log(`Created: ${result.created}`);
  console.log(`Skipped: ${result.skipped}`);
  console.log(`Failed: ${result.failed}`);
  console.log(`\nView at: ${STRAPI_URL}/admin`);
  console.log("Frontend: http://localhost:3001/xe-o-to");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
