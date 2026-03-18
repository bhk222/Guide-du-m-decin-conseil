/**
 * 📦 Download Whisper SMALL model files for self-hosting
 * 
 * Downloads ONNX model files from HuggingFace to public/models/
 * so the app serves them from its own CDN (no external downloads for users).
 * 
 * Files are cached in node_modules/.cache/whisper-models/ to avoid
 * re-downloading on subsequent builds (Vercel caches node_modules).
 * 
 * Usage:
 *   node scripts/download-whisper.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const MODEL_ID = 'onnx-community/whisper-small';
const HF_BASE = `https://huggingface.co/${MODEL_ID}/resolve/main`;

const CACHE_DIR = path.join(ROOT, 'node_modules', '.cache', 'whisper-models', 'onnx-community', 'whisper-small');
const OUTPUT_DIR = path.join(ROOT, 'public', 'models', 'onnx-community', 'whisper-small');

// ── Files to download ──
// Config files (required by transformers.js)
// ONNX quantized (int8) for WASM backend
// ONNX fp16 for WebGPU backend
const FILES = [
    // Config
    'config.json',
    'generation_config.json',
    'preprocessor_config.json',
    'tokenizer.json',
    'tokenizer_config.json',
    // ONNX — WASM (quantized int8, ~237MB total)
    'onnx/encoder_model_quantized.onnx',
    'onnx/decoder_model_merged_quantized.onnx',
    // ONNX — WebGPU (fp16, ~463MB total)
    'onnx/encoder_model_fp16.onnx',
    'onnx/decoder_model_merged_fp16.onnx',
];

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}

async function downloadFile(file) {
    const cachePath = path.join(CACHE_DIR, file);

    // Skip if already cached
    if (fs.existsSync(cachePath)) {
        const stat = fs.statSync(cachePath);
        if (stat.size > 0) {
            console.log(`  ✓ ${file} (${formatBytes(stat.size)}, cached)`);
            return;
        }
        // File exists but empty — re-download
        fs.unlinkSync(cachePath);
    }

    const url = `${HF_BASE}/${file}`;
    console.log(`  ↓ ${file}...`);

    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${url}`);
    }

    const totalBytes = parseInt(res.headers.get('content-length') || '0', 10);
    let downloadedBytes = 0;

    fs.mkdirSync(path.dirname(cachePath), { recursive: true });
    const tmpPath = cachePath + '.tmp';
    const ws = fs.createWriteStream(tmpPath);

    const reader = res.body.getReader();
    let lastPct = -1;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        ws.write(Buffer.from(value));
        downloadedBytes += value.length;
        if (totalBytes > 1024 * 1024) { // Only show progress for files > 1MB
            const pct = Math.round(downloadedBytes / totalBytes * 100);
            if (pct !== lastPct && pct % 5 === 0) {
                process.stdout.write(`    ${formatBytes(downloadedBytes)} / ${formatBytes(totalBytes)} (${pct}%)\r`);
                lastPct = pct;
            }
        }
    }

    ws.end();
    await new Promise((resolve, reject) => {
        ws.on('finish', resolve);
        ws.on('error', reject);
    });

    // Atomic rename
    fs.renameSync(tmpPath, cachePath);

    if (totalBytes > 1024 * 1024) {
        process.stdout.write('\r' + ' '.repeat(60) + '\r');
    }
    console.log(`  ✓ ${file} (${formatBytes(downloadedBytes)})`);
}

async function main() {
    console.log('');
    console.log('🤖 Whisper SMALL — Téléchargement du modèle pour self-hosting');
    console.log(`   Modèle: ${MODEL_ID}`);
    console.log(`   Cache:  ${path.relative(ROOT, CACHE_DIR)}`);
    console.log(`   Sortie: ${path.relative(ROOT, OUTPUT_DIR)}`);
    console.log('');

    // Check if output already has all files
    const allPresent = FILES.every(f => {
        const p = path.join(OUTPUT_DIR, f);
        return fs.existsSync(p) && fs.statSync(p).size > 0;
    });
    if (allPresent) {
        console.log('  ✅ Tous les fichiers du modèle sont déjà en place.');
        console.log('');
        return;
    }

    // Download to cache
    console.log('📦 Téléchargement vers le cache...');
    for (const file of FILES) {
        await downloadFile(file);
    }

    // Copy from cache to public
    console.log('');
    console.log('📁 Copie vers public/models/...');
    for (const file of FILES) {
        const src = path.join(CACHE_DIR, file);
        const dst = path.join(OUTPUT_DIR, file);
        fs.mkdirSync(path.dirname(dst), { recursive: true });
        fs.copyFileSync(src, dst);
    }

    console.log('');
    console.log('✅ Modèle Whisper SMALL prêt dans public/models/');
    console.log('   Les fichiers seront servis depuis le CDN de l\'application.');
    console.log('');
}

main().catch(err => {
    console.error('');
    console.error(`❌ Erreur: ${err.message}`);
    console.error('');
    process.exit(1);
});
