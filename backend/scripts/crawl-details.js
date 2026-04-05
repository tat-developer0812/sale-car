/**
 * Re-crawl detail pages for cars that have detailUrl
 * Updates data/cars.json with specs, gallery, description
 * Usage: node scripts/crawl-details.js [--limit N]
 */

const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const CARS_FILE = path.join(DATA_DIR, "cars.json");

const DELAY_MS = 1200;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const limit = parseInt(process.argv.find((a) => a.match(/^\d+$/)) || "100");

async function fetchHTML(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      Accept: "text/html",
      "Accept-Language": "vi-VN,vi;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

async function crawlDetail(url) {
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);
  const specs = {};
  const images = [];

  // Parse specs from div.row > div.label + div.txt_input
  $(".row").each((_, row) => {
    const label = $(row)
      .find(".label label")
      .text()
      .trim()
      .toLowerCase()
      .replace(/:$/, "");
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
    if (label.includes("nhiên liệu")) specs.fuelConsumption = value;
    if (label.includes("màu ngoại")) specs.exteriorColor = value;
    if (label.includes("màu nội")) specs.interiorColor = value;
    if (label.includes("năm")) specs.year = value;
  });

  // Parse gallery images
  $('img[src*="/uploads/"]').each((_, img) => {
    let src = $(img).attr("src") || "";
    src = src.replace(/\/s_/, "/l_").replace(/\/m_/, "/l_");
    if (src && !images.includes(src)) images.push(src);
  });

  const description = $('meta[name="description"]').attr("content") || "";

  return { specs, images, description };
}

async function main() {
  const cars = JSON.parse(fs.readFileSync(CARS_FILE, "utf-8"));
  const targets = cars.filter((c) => c.detailUrl && !c.specs);

  console.log(`Found ${targets.length} cars needing details (limit: ${limit})`);
  const batch = targets.slice(0, limit);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < batch.length; i++) {
    const car = batch[i];
    process.stdout.write(
      `  [${i + 1}/${batch.length}] ${car.name.substring(0, 40)}... `
    );

    try {
      const detail = await crawlDetail(car.detailUrl);
      if (Object.keys(detail.specs).length > 0) {
        car.specs = detail.specs;
        // Update category from bodyType
        if (detail.specs.bodyType) {
          const bt = detail.specs.bodyType.toLowerCase();
          if (bt.includes("suv") || bt.includes("crossover")) car.category = "suv";
          else if (bt.includes("mpv") || bt.includes("minivan")) car.category = "mpv";
          else if (bt.includes("hatchback")) car.category = "hatchback";
          else if (bt.includes("bán tải") || bt.includes("pickup")) car.category = "pickup";
          else if (bt.includes("sedan")) car.category = "sedan";
        }
      }
      if (detail.images.length > 0) car.galleryImages = detail.images;
      if (detail.description) car.fullDescription = detail.description;

      console.log(
        `OK (${Object.keys(detail.specs).length} specs, ${detail.images.length} imgs)`
      );
      success++;
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      failed++;
    }

    await sleep(DELAY_MS);
  }

  // Save updated cars
  fs.writeFileSync(CARS_FILE, JSON.stringify(cars, null, 2), "utf-8");

  console.log(`\nDone! Success: ${success}, Failed: ${failed}`);
  console.log(`Total cars with specs: ${cars.filter((c) => c.specs).length}`);
  console.log(`Total cars with gallery: ${cars.filter((c) => c.galleryImages).length}`);
}

main().catch(console.error);
