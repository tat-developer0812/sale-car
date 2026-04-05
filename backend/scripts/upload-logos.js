/**
 * Upload brand logos to Strapi and link them to brands
 * Usage: node scripts/upload-logos.js
 */

const fs = require("fs");
const path = require("path");
const { Blob } = require("buffer");

const STRAPI_URL = "http://127.0.0.1:1337";
const STRAPI_TOKEN =
  "b1f8920755900d261b386e5ccbbf0e4f47aa0b89a917de3d41f20a6c6083fffd53c7716fea50e609712c177aa33e8db8b3180a706183c691e378ac7218a8522cf44095c11b8d33d153f484e559e1ccf16d9531290b391920bad6f7c5297194fd1e7975579926381457edc645d10f41f7244f80ce8fa52b7594cf4b17d0e0d210";

const LOGOS_DIR = path.join(__dirname, "..", "data", "logos");
const DELAY = 300;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Map brand names to logo filenames (handle slug mismatches)
const SLUG_MAP = {
  "Mercedes-Benz": "mercedes_benz",
  "Mercedes Benz": "mercedes_benz",
  "Lynk & Co": "lynk_co",
  LandRover: "landrover",
};

async function main() {
  // Get all brands without logos
  const res = await fetch(
    `${STRAPI_URL}/api/brands?pagination[pageSize]=100&populate[logo][fields][0]=url`,
    { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
  );
  const data = await res.json();
  const brands = data.data || [];

  console.log(`Found ${brands.length} brands\n`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const brand of brands) {
    const hasLogo = brand.logo?.url;
    if (hasLogo) {
      skipped++;
      continue;
    }

    // Find logo file
    const slugVariants = [
      brand.slug,
      SLUG_MAP[brand.name],
      brand.name.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
      brand.name.toLowerCase().replace(/[^a-z0-9]+/g, ""),
    ].filter(Boolean);

    let logoPath = null;
    let logoFile = null;
    for (const slug of slugVariants) {
      const p = path.join(LOGOS_DIR, `${slug}.png`);
      if (fs.existsSync(p)) {
        logoPath = p;
        logoFile = `${slug}.png`;
        break;
      }
    }

    if (!logoPath) {
      console.log(`  [SKIP] ${brand.name} - no logo file found (tried: ${slugVariants.join(", ")})`);
      failed++;
      continue;
    }

    process.stdout.write(`  ${brand.name}... `);

    try {
      // Upload logo
      const buffer = fs.readFileSync(logoPath);
      const blob = new Blob([buffer], { type: "image/png" });
      const form = new FormData();
      form.append("files", blob, `${brand.slug}-logo.png`);

      const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
        body: form,
      });

      if (!uploadRes.ok) {
        console.log("upload failed");
        failed++;
        continue;
      }

      const uploadData = await uploadRes.json();
      const fileId = uploadData[0]?.id;

      if (!fileId) {
        console.log("no file id");
        failed++;
        continue;
      }

      // Link logo to brand
      const updateRes = await fetch(
        `${STRAPI_URL}/api/brands/${brand.documentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: { logo: fileId } }),
        }
      );

      if (updateRes.ok) {
        console.log("OK");
        uploaded++;
      } else {
        const err = await updateRes.json();
        console.log(`link failed: ${err.error?.message}`);
        failed++;
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      failed++;
    }

    await sleep(DELAY);
  }

  console.log(`\nDone! Uploaded: ${uploaded}, Skipped: ${skipped}, Failed: ${failed}`);
}

main().catch(console.error);
