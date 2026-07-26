/**
 * gen-srcset.mjs
 * Generate 800w WebP variants for images consumed via srcset800().
 * Run once after adding/updating images; variants are committed to git.
 *
 * Usage: node scripts/gen-srcset.mjs
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dir  = dirname(fileURLToPath(import.meta.url));
const ROOT   = join(__dir, '..', 'public', 'optimized');
const TARGET_W = 800;

// Directories whose images are never shown at srcset-relevant sizes
const SKIP_DIRS = new Set(['logo']);

async function processFile(filePath) {
  if (filePath.includes('-800w.webp')) return; // already a variant

  const meta = await sharp(filePath).metadata();
  if (!meta.width) return;

  const ext = extname(filePath);
  const out = filePath.replace(ext, `-800w${ext}`);
  if (existsSync(out)) return; // keep existing variants (avoid needless re-encode/churn)

  await sharp(filePath)
    .resize({ width: Math.min(TARGET_W, meta.width), withoutEnlargement: true })
    .webp({ quality: 72, effort: 5 })
    .toFile(out);

  const inSize  = (await stat(filePath)).size;
  const outSize = (await stat(out)).size;
  const pct     = Math.round((1 - outSize / inSize) * 100);
  console.log(`  ✓ ${basename(out)}  ${Math.round(inSize / 1024)}KB → ${Math.round(outSize / 1024)}KB (-${pct}%)`);
}

async function walk(dir) {
  const folder = basename(dir);
  if (SKIP_DIRS.has(folder)) return;

  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (entry.name.endsWith('.webp')) {
      await processFile(full);
    }
  }
}

console.log('Generating 800w srcset variants…\n');
await walk(ROOT);
console.log('\nDone.');
