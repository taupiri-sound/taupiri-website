/**
 * Seed script: replaces the Sanity Equipment List singleton with the
 * corrected data from docs/equipmentList.ts.
 *
 * Usage:
 *   node scripts/seed-equipment-list.mjs
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ── Load .env.local ───────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const env = Object.fromEntries(
  envContent
    .split('\n')
    .filter(line => line && !line.startsWith('#') && line.includes('='))
    .map(line => {
      const [key, ...rest] = line.split('=');
      return [key.trim(), rest.join('=').trim().replace(/^"|"$/g, '')];
    })
);

// ── Sanity client ─────────────────────────────────────────────────────────────
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-07-29',
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const randomKey = () => Math.random().toString(36).slice(2, 12);

// ── Equipment data (mirrors docs/equipmentList.ts) ───────────────────────────
//
// Icon values must match ICON_OPTIONS in src/sanity/schemaTypes/shared/iconOptions.ts
// Available: acoustics | location | liveRoom | equipment | phone | email | facebook | guitar | speaker
//
const categories = [
  {
    name: 'Console',
    icon: 'equipment',   // Closest match — fader/mixer graphic
    items: [
      'TL Audio VTC 16/32ch valve inline recording console with 16x pre/eq modules',
    ],
  },
  {
    name: 'Computer / Interface',
    icon: 'equipment',   // Generic equipment — no computer icon available
    items: [
      'Pro Tools Studio 2025',
      'Focusrite Pro RED16 line 64 i/o Dante interface',
      '2021 Mac Pro / M1 MacBook Pro',
      'Universal Audio Solo mobile interface',
      'Focusrite Pro AM2 Dante monitoring',
    ],
  },
  {
    name: 'Outboard',
    icon: 'equipment',   // Fader icon suits outboard gear
    items: [
      'Neve 1073 Pre/EQ racked by Vintage King',
      'Buzz Audio QSP-20 4 channel Preamp',
      'Focusrite Red pres x2 / Universal Audio unison x2',
      'Summit Audio TLA-100 tube compressor',
      'Eventide H3000 SE',
      'Joe Meek VC1 Preamp/Compressor',
      'Warm Audio WA-76 Compressor/Limiter',
      'Lexicon MX200',
      'Mackie and Behringer headphone monitors',
    ],
  },
  {
    name: 'Monitoring',
    icon: 'speaker',     // Speaker icon — perfect match
    items: [
      'Focal Solo6 Be',
    ],
  },
  {
    name: 'Mics',
    icon: 'acoustics',   // Sound-wave icon — closest to microphones
    items: [
      'Neumann U87ai',
      'Neumann KM184 x2',
      'Neumann TLM102',
      'Shure SM7B',
      'Rode NT2-A',
      'Rode K2',
      'Shure Beta 52A',
      'Audix D6',
      'Audix i5 x2',
      'Shure SM57 x2',
      'Shure SM58',
      'Sennheiser e904',
      'sE Electronics sE1a',
      'MXL V67G',
    ],
  },
  {
    name: 'Instruments / Misc',
    icon: 'guitar',      // Guitar icon — direct match
    items: [
      'DW Design 5-piece drum kit',
      'Lots of stringed instruments, keyboards, percussion, Taonga Puoro and toys.',
      'Roland JV 1080 rack-mount synth',
      'Countryman Type 10 active DI',
      'SansAmp Bass Driver DI',
    ],
  },
  {
    name: 'Software',
    icon: 'equipment',   // No software icon available; equipment is the best fallback
    items: [
      'Pro Tools Studio and Logic Pro X',
      'UAD plugins',
      'Slate and SSL plugins',
      'Neural DSP Archetype Plini, Darkglass Ultra, Fortin Cali Suite',
      'Melodyne 5',
      'Oeksound Soothe',
      'Various Soundtoys, Waves, Plugin Alliance, Kazrog and others (ask us)',
    ],
  },
];

// ── Build the Sanity-shaped categories array ──────────────────────────────────
const sanityCategories = categories.map(category => ({
  _type: 'equipmentCategory',
  _key: randomKey(),
  name: category.name,
  icon: category.icon,
  items: category.items.map(name => ({
    _type: 'equipmentItem',
    _key: randomKey(),
    name,
    isTemporarilyUnavailable: false,
  })),
}));

// ── Run ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Connecting to Sanity (project: ${env.NEXT_PUBLIC_SANITY_PROJECT_ID}, dataset: ${env.NEXT_PUBLIC_SANITY_DATASET})...`);

  const doc = await client.getDocument('equipmentListSingleton');

  if (!doc) {
    console.error('equipmentListSingleton document not found in Sanity. Has it been created in the Studio?');
    process.exit(1);
  }

  console.log(`Found existing document. Current category count: ${doc.categories?.length ?? 0}`);
  console.log(`Replacing with ${sanityCategories.length} categories...`);

  await client
    .patch('equipmentListSingleton')
    .set({ categories: sanityCategories })
    .commit();

  console.log('Done. Equipment list updated successfully.');
  sanityCategories.forEach(c => console.log(`  ✓ ${c.name} (${c.items.length} items)`));
}

main().catch(err => {
  console.error('Script failed:', err.message);
  process.exit(1);
});
