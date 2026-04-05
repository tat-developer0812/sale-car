/**
 * Crawl car brands, logos, and car data from bonbanh.com
 * Usage: node scripts/crawl-bonbanh.js
 *
 * Output:
 *   - data/brands.json       (brand name, slug, logo)
 *   - data/cars.json          (all cars with prices, specs)
 *   - data/logos/             (downloaded brand logo images)
 */

const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://bonbanh.com";
const DATA_DIR = path.join(__dirname, "..", "data");
const LOGOS_DIR = path.join(DATA_DIR, "logos");

const DELAY_MS = 1500;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchHTML(url) {
  console.log(`  Fetching: ${url}`);
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "vi-VN,vi;q=0.9,en;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

async function downloadImage(url, filepath) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return false;
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filepath, buffer);
    return true;
  } catch {
    return false;
  }
}

// Parse Vietnamese price: "Từ 458.000.000" or "512 Triệu" or "1 Tỷ 195 Triệu"
function parsePrice(priceText) {
  if (!priceText) return 0;
  const text = priceText.trim().toLowerCase();

  // Format: "Từ 458.000.000" or "458.000.000"
  const dotFormat = text.match(/([\d.]+)/);
  if (dotFormat) {
    const numStr = dotFormat[1].replace(/\./g, "");
    const num = parseInt(numStr);
    // If number > 100000, it's already in VND
    if (num > 100000) return num;
  }

  // Format: "1 Tỷ 195 Triệu" or "512 Triệu"
  let total = 0;
  const tyMatch = text.match(/(\d+)\s*t[yỷ]/);
  const trieuMatch = text.match(/(\d+)\s*tri[eệ]u/);
  if (tyMatch) total += parseInt(tyMatch[1]) * 1000000000;
  if (trieuMatch) total += parseInt(trieuMatch[1]) * 1000000;

  return total || 0;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
    .replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i")
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u")
    .replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractYear(text) {
  const match = text.match(/20[12]\d/);
  return match ? parseInt(match[0]) : new Date().getFullYear();
}

function guessFuelType(text) {
  if (!text) return "gasoline";
  const lower = text.toLowerCase();
  if (lower.includes("điện") || lower.includes("electric")) return "electric";
  if (lower.includes("hybrid")) return "hybrid";
  if (lower.includes("dầu") || lower.includes("diesel")) return "diesel";
  return "gasoline";
}

function guessTransmission(text) {
  if (!text) return "automatic";
  const lower = text.toLowerCase();
  if (lower.includes("số sàn") || lower.includes("mt") || lower.match(/\bmt\b/))
    return "manual";
  if (lower.includes("cvt")) return "cvt";
  return "automatic";
}

function guessCategory(name) {
  const lower = name.toLowerCase();
  if (lower.includes("suv") || lower.includes("cross")) return "suv";
  if (lower.includes("mpv") || lower.includes("avanza") || lower.includes("innova") || lower.includes("xpander") || lower.includes("stargazer"))
    return "mpv";
  if (lower.includes("pickup") || lower.includes("hilux") || lower.includes("ranger") || lower.includes("triton") || lower.includes("navara"))
    return "pickup";
  if (lower.includes("hatchback") || lower.includes("i20") || lower.includes("swift") || lower.includes("yaris"))
    return "hatchback";
  return "sedan";
}

// ─── Step 1: Crawl all brands ───
async function crawlBrands() {
  console.log("\n=== CRAWLING BRANDS ===");
  const html = await fetchHTML(`${BASE_URL}/gia-xe-oto`);
  const $ = cheerio.load(html);

  const brands = [];

  // Real structure: div.make-logos > div.logo-col > a.item
  $(".logo-col a.item, .make-logos a.item, a[href^='/gia-xe-oto-']").each(
    (_, el) => {
      const $el = $(el);
      const href = $el.attr("href") || "";
      const img = $el.find("img");

      if (!href.match(/\/gia-xe-oto-[a-z]/)) return;

      const logoUrl = img.attr("src") || "";
      const title = $el.attr("title") || img.attr("alt") || img.attr("title") || "";

      // Extract brand name from title "Bảng giá xe Toyota mới nhất"
      let name = title
        .replace(/^bảng giá xe\s*/i, "")
        .replace(/\s*mới nhất$/i, "")
        .trim();

      // Fallback: extract from h3
      if (!name) {
        const h3 = $el.find("h3").text().trim();
        name = h3.replace(/^giá xe\s*/i, "").trim();
      }

      const slugMatch = href.match(/\/gia-xe-oto-(.+?)$/);
      if (!slugMatch || !name) return;

      const slug = slugMatch[1];

      // Avoid duplicates
      if (brands.find((b) => b.slug === slug)) return;

      brands.push({
        name,
        slug,
        logoUrl,
        brandPageUrl: `${BASE_URL}${href}`,
      });
    }
  );

  console.log(`  Found ${brands.length} brands`);
  return brands;
}

// ─── Step 2: Download brand logos ───
async function downloadLogos(brands) {
  console.log("\n=== DOWNLOADING LOGOS ===");
  fs.mkdirSync(LOGOS_DIR, { recursive: true });

  for (const brand of brands) {
    if (!brand.logoUrl) {
      brand.logoFile = null;
      continue;
    }
    const ext = path.extname(new URL(brand.logoUrl).pathname) || ".png";
    const filename = `${brand.slug}${ext}`;
    const filepath = path.join(LOGOS_DIR, filename);

    if (fs.existsSync(filepath)) {
      console.log(`  Skip (exists): ${filename}`);
      brand.logoFile = filename;
      continue;
    }

    const success = await downloadImage(brand.logoUrl, filepath);
    if (success) {
      console.log(`  Downloaded: ${filename}`);
      brand.logoFile = filename;
    } else {
      console.log(`  FAILED: ${filename}`);
      brand.logoFile = null;
    }
    await sleep(300);
  }
}

// ─── Step 3: Crawl cars for each brand ───
async function crawlBrandCars(brand) {
  const html = await fetchHTML(brand.brandPageUrl);
  const $ = cheerio.load(html);

  const cars = [];

  // === A: Parse pricing table (official prices) ===
  $("table tbody tr, table tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length < 2) return;

    const modelName = $(cells[0]).text().trim();
    const priceText = $(cells[1]).text().trim();

    // Skip header row
    if (
      !modelName ||
      modelName.toLowerCase().includes("dòng xe") ||
      modelName.toLowerCase().includes("phiên bản")
    )
      return;

    const price = parsePrice(priceText);
    if (price === 0) return;

    cars.push({
      name: modelName,
      slug: slugify(modelName),
      brandName: brand.name,
      brandSlug: brand.slug,
      price,
      priceText,
      year: new Date().getFullYear(),
      status: "available",
      category: guessCategory(modelName),
      fuelType: guessFuelType(modelName),
      transmission: "automatic",
      source: "table",
    });
  });

  // === B: Parse car carousel listings ===
  $(".regular_2 .regular_box, .regular_2 > div").each((_, el) => {
    const $el = $(el);

    // Title from h3
    const h3 = $el.find("h3").first();
    let title = h3.text().replace(/\s+/g, " ").trim();
    if (!title) return;

    // Price
    const priceText = $el.find(".o_price, span").first().text().trim();

    // Image
    const img = $el.find("img").first();
    const imageUrl = img.attr("src") || "";

    // Detail link
    const link = $el.find('a[href*="/xe-"]').first();
    const detailUrl = link.attr("href") || "";

    // Description
    const desc = $el.find("p").first().text().trim();

    // Location
    const location = $el.find("p").last().text().trim();

    cars.push({
      name: title,
      slug: slugify(title),
      brandName: brand.name,
      brandSlug: brand.slug,
      price: parsePrice(priceText),
      priceText,
      year: extractYear(title),
      status: "available",
      category: guessCategory(title),
      fuelType: guessFuelType(desc),
      transmission: guessTransmission(desc),
      imageUrl: imageUrl.startsWith("http") ? imageUrl : "",
      detailUrl: detailUrl.startsWith("http") ? detailUrl : detailUrl ? `${BASE_URL}${detailUrl}` : "",
      shortDescription: desc,
      location: location.replace(/[\[\]]/g, "").trim(),
      source: "listing",
    });
  });

  return cars;
}

// ─── Step 4: Crawl detail page ───
async function crawlCarDetail(detailUrl) {
  try {
    const html = await fetchHTML(detailUrl);
    const $ = cheerio.load(html);

    const specs = {};
    const images = [];

    // Real structure: div.row > div.label > label + div.txt_input > span.inp
    $(".row").each((_, row) => {
      const label = $(row).find(".label label").text().trim().toLowerCase().replace(/:$/, "");
      const value = $(row).find(".txt_input .inp").text().trim();
      if (!label || !value) return;

      if (label.includes("động cơ")) specs.engine = value;
      if (label.includes("công suất")) specs.power = value;
      if (label.includes("số chỗ")) specs.seats = parseInt(value) || undefined;
      if (label.includes("số cửa")) specs.doors = parseInt(value) || undefined;
      if (label.includes("hộp số")) specs.transmissionText = value;
      if (label.includes("xuất xứ")) specs.origin = value;
      if (label.includes("kiểu dáng")) specs.bodyType = value;
      if (label.includes("dẫn động")) specs.driveType = value;
      if (label.includes("tình trạng")) specs.condition = value;
      if (label.includes("nhiên liệu") || label.includes("tiêu hao"))
        specs.fuelConsumption = value;
      if (label.includes("màu ngoại")) specs.exteriorColor = value;
      if (label.includes("màu nội")) specs.interiorColor = value;
      if (label.includes("năm")) specs.year = value;
    });

    // Extract gallery images
    $('img[src*="/uploads/"]').each((_, img) => {
      let src = $(img).attr("src") || "";
      // Convert to large version
      src = src.replace(/\/s_/, "/l_").replace(/\/m_/, "/l_");
      if (src && !images.includes(src)) images.push(src);
    });

    const description = $('meta[name="description"]').attr("content") || "";

    return { specs, images, description };
  } catch (err) {
    console.log(`  Error: ${err.message}`);
    return { specs: {}, images: [], description: "" };
  }
}

// ─── Deduplicate ───
function deduplicateCars(cars) {
  const seen = new Map();
  for (const car of cars) {
    const existing = seen.get(car.slug);
    // Prefer listing source (has images) over table source
    if (!existing || (car.source === "listing" && car.imageUrl)) {
      seen.set(car.slug, car);
    }
  }
  return Array.from(seen.values());
}

// ─── Main ───
async function main() {
  console.log("🚗 BonBanh.com Crawler for VuKia");
  console.log("=================================\n");

  fs.mkdirSync(DATA_DIR, { recursive: true });

  // Step 1: Get brands
  const brands = await crawlBrands();
  await sleep(DELAY_MS);

  // Step 2: Download logos
  await downloadLogos(brands);

  // Step 3: Crawl cars per brand
  console.log("\n=== CRAWLING CAR DATA ===");
  let allCars = [];

  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];
    console.log(`\n[${i + 1}/${brands.length}] ${brand.name}...`);

    try {
      const cars = await crawlBrandCars(brand);
      console.log(`  Found ${cars.length} entries`);
      allCars.push(...cars);
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
    }

    await sleep(DELAY_MS);
  }

  // Deduplicate
  allCars = deduplicateCars(allCars);
  console.log(`\n✅ Total unique cars: ${allCars.length}`);

  // Step 4: Crawl details for listing cars (sample - limit for speed)
  const carsWithDetails = allCars.filter((c) => c.detailUrl);
  const MAX_DETAILS = 30;
  const detailSample = carsWithDetails.slice(0, MAX_DETAILS);

  if (detailSample.length > 0) {
    console.log(`\n=== CRAWLING DETAILS (${detailSample.length} cars) ===`);

    for (let i = 0; i < detailSample.length; i++) {
      const car = detailSample[i];
      console.log(`  [${i + 1}/${detailSample.length}] ${car.name}`);

      const detail = await crawlCarDetail(car.detailUrl);
      if (Object.keys(detail.specs).length > 0) car.specs = detail.specs;
      if (detail.images.length > 0) car.galleryImages = detail.images;
      if (detail.description) car.fullDescription = detail.description;

      await sleep(DELAY_MS);
    }
  }

  // Save
  const brandsOutput = brands.map((b) => ({
    name: b.name,
    slug: b.slug,
    logoUrl: b.logoUrl,
    logoFile: b.logoFile,
  }));

  fs.writeFileSync(
    path.join(DATA_DIR, "brands.json"),
    JSON.stringify(brandsOutput, null, 2),
    "utf-8"
  );

  fs.writeFileSync(
    path.join(DATA_DIR, "cars.json"),
    JSON.stringify(allCars, null, 2),
    "utf-8"
  );

  console.log("\n=== DONE ===");
  console.log(`📁 Brands: ${brands.length} → data/brands.json`);
  console.log(`📁 Cars:   ${allCars.length} → data/cars.json`);
  console.log(`📁 Logos:  ${LOGOS_DIR}`);

  // Summary
  console.log("\n--- Cars by brand ---");
  const byBrand = {};
  for (const car of allCars) {
    byBrand[car.brandName] = (byBrand[car.brandName] || 0) + 1;
  }
  Object.entries(byBrand)
    .sort((a, b) => b[1] - a[1])
    .forEach(([name, count]) => {
      console.log(`  ${name}: ${count}`);
    });
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
