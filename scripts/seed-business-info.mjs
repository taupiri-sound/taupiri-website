/**
 * Seed script: populates the businessInfo singleton in Sanity with
 * the values previously stored in src/lib/constants.ts.
 *
 * Run with:
 *   node scripts/seed-business-info.mjs
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local (already present).
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ── Load .env.local manually (no dotenv dependency needed) ───────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf-8');

const env = Object.fromEntries(
  envContent
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('#'))
    .map((line) => {
      const idx = line.indexOf('=');
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      return [key, value];
    })
);

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const token = env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Missing required environment variables. Check .env.local.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-07-29',
  token,
  useCdn: false,
});

// ── Data from constants.ts ────────────────────────────────────────────────────
const patch = {
  email: {
    value: 'lance@taupirisound.co.nz',
    link: 'mailto:lance@taupirisound.co.nz',
  },
  phone: {
    value: '+64 21 311 903',
    link: 'tel:+6421311903',
  },
  address: {
    value: 'Topview Road, Taupiri 3792, New Zealand',
    link: 'https://maps.app.goo.gl/AXFyaZad32c1c2sx6',
  },
  businessLocation: {
    streetAddress: 'Topview Road',
    addressLocality: 'Taupiri',
    postalCode: '3792',
    addressRegion: 'Waikato',
    addressCountry: 'NZ',
    latitude: '-37.5940869',
    longitude: '175.2095489',
    regionCode: 'NZ-WKO',
  },
  businessHours: 'By Appointment Only',
  priceRange: '',
  serviceAreas: [
    { _key: 'area-1', type: 'Country', name: 'New Zealand' },
    { _key: 'area-2', type: 'State', name: 'Waikato' },
    { _key: 'area-3', type: 'City', name: 'Hamilton' },
    { _key: 'area-4', type: 'City', name: 'Auckland' },
  ],
};

// ── Patch the businessInfo singleton ─────────────────────────────────────────
async function seed() {
  console.log(`Patching businessInfo in project "${projectId}" / dataset "${dataset}"…`);

  await client
    .patch('businessInfo')
    .set(patch)
    .commit({ autoGenerateArrayKeys: false });

  console.log('✓ businessInfo updated successfully.');
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
