/**
 * Replace car thumbnail images with large gallery images from bonbanh
 * Also upload gallery images
 * Usage: node scripts/fix-car-images.js
 */

const fs = require("fs");
const path = require("path");
const { Blob } = require("buffer");

const STRAPI_URL = "http://127.0.0.1:1337";
const STRAPI_TOKEN =
  "b1f8920755900d261b386e5ccbbf0e4f47aa0b89a917de3d41f20a6c6083fffd53c7716fea50e609712c177aa33e8db8b3180a706183c691e378ac7218a8522cf44095c11b8d33d153f484e559e1ccf16d9531290b391920bad6f7c5297194fd1e7975579926381457edc645d10f41f7244f80ce8fa52b7594cf4b17d0e0d210";

const DATA_DIR = path.join(__dirname, "..", "data");
const DELAY = 250;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function uploadFromUrl(imageUrl, fileName) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(imageUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 1000) return null;

    const blob = new Blob([buffer], { type: "image/jpeg" });
    const form = new FormData();
    form.append("files", blob, fileName);

    const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      body: form,
    });

    if (!uploadRes.ok) return null;
    const data = await uploadRes.json();
    return data[0];
  } catch {
    return null;
  }
}

async function main() {
  // Load crawled data
  const crawledCars = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "cars.json"), "utf-8"));
  const crawledMap = {};
  for (const c of crawledCars) {
    if (c.galleryImages?.length > 0) {
      crawledMap[c.slug] = c.galleryImages;
    }
  }

  console.log(`Crawled cars with gallery: ${Object.keys(crawledMap).length}\n`);

  // Get all cars from Strapi
  let page = 1;
  const allStrapiCars = [];
  while (true) {
    const res = await fetch(
      `${STRAPI_URL}/api/cars?pagination[page]=${page}&pagination[pageSize]=100&fields[0]=name&fields[1]=slug&populate[mainImage][fields][0]=url&populate[mainImage][fields][1]=width`,
      { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
    );
    const data = await res.json();
    allStrapiCars.push(...data.data);
    if (page >= data.meta.pagination.pageCount) break;
    page++;
  }

  console.log(`Strapi cars: ${allStrapiCars.length}`);

  // Find cars that need better images (small images < 500px wide)
  const needsFix = allStrapiCars.filter((c) => {
    const w = c.mainImage?.width || 0;
    const hasGallery = crawledMap[c.slug];
    return w < 500 && hasGallery;
  });

  console.log(`Cars needing image fix: ${needsFix.length}\n`);

  let fixed = 0;
  let failed = 0;

  for (let i = 0; i < needsFix.length; i++) {
    const car = needsFix[i];
    const gallery = crawledMap[car.slug];
    if (!gallery || gallery.length === 0) continue;

    process.stdout.write(`[${i + 1}/${needsFix.length}] ${car.name.substring(0, 45)}... `);

    try {
      // Upload first gallery image as new mainImage (large version)
      const mainImgUrl = gallery[0];
      const mainUploaded = await uploadFromUrl(mainImgUrl, `${car.slug}-main-lg.jpg`);

      if (!mainUploaded) {
        console.log("upload failed");
        failed++;
        await sleep(DELAY);
        continue;
      }

      // Upload remaining gallery images (up to 5)
      const galleryIds = [];
      const gallerySlice = gallery.slice(1, 6);
      for (let g = 0; g < gallerySlice.length; g++) {
        const uploaded = await uploadFromUrl(
          gallerySlice[g],
          `${car.slug}-gallery-${g + 1}.jpg`
        );
        if (uploaded) galleryIds.push(uploaded.id);
        await sleep(100);
      }

      // Update car with new mainImage and gallery
      const updateData = { mainImage: mainUploaded.id };
      if (galleryIds.length > 0) {
        updateData.gallery = galleryIds;
      }

      const updateRes = await fetch(
        `${STRAPI_URL}/api/cars/${car.documentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: updateData }),
        }
      );

      if (updateRes.ok) {
        console.log(
          `OK (main: ${mainUploaded.width}x${mainUploaded.height}, gallery: ${galleryIds.length})`
        );
        fixed++;
      } else {
        const err = await updateRes.json();
        console.log(`update failed: ${err.error?.message?.substring(0, 50)}`);
        failed++;
      }
    } catch (err) {
      console.log(`ERROR: ${err.message.substring(0, 50)}`);
      failed++;
    }

    await sleep(DELAY);
  }

  console.log(`\nDone! Fixed: ${fixed}, Failed: ${failed}`);
}

main().catch(console.error);
