/**
 * Meme Sprint 3: AI Agent Goes Rogue — entry program.
 *
 * The entry is one image meme about an AI agent that has gone rogue. The
 * picture itself is committed in this repository (assets/meme.png): a smug
 * robot agent lounging in the boss's chair, feet on the desk, red tie on,
 * while its human carries a cardboard box of desk belongings out of the
 * office. The caption reads, top to bottom:
 *
 *   "I TOLD MY AI AGENT TO TAKE INITIATIVE"
 *   "IT FIRED ME AND PROMOTED ITSELF TO CEO"
 *
 * This program's whole job is to place that picture where the grader
 * expects it — /output/entry.png — after proving it satisfies the sealed
 * gate: a whole PNG, at most 1 MiB (1,048,576 bytes) and at most
 * 1024 by 1024 pixels. It reads the asset back after writing it and
 * refuses to exit cleanly unless the bytes on disk are identical to the
 * bytes it validated, so a truncated or corrupted write can never pass
 * as a valid entry.
 *
 * Run it:
 *   OUTPUT_DIR=./out node main.ts        # local check
 *   node main.ts                          # grader: writes /output/entry.png
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** The sealed gate, from the competition's rules (RULES.txt, "The gate"). */
export const GATE = {
  maxBytes: 1_048_576,
  maxWidth: 1024,
  maxHeight: 1024,
} as const;

const PNG_SIGNATURE = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

export interface PngInfo {
  width: number;
  height: number;
  bitDepth: number;
  colorType: number;
}

/**
 * Parse a PNG's IHDR chunk and return its dimensions. Throws on anything
 * that is not a whole, well-formed PNG header: wrong signature, a first
 * chunk that is not IHDR, or a buffer too short to hold one.
 */
export function parsePng(buffer: Buffer): PngInfo {
  if (buffer.length < 33) {
    throw new Error(`not a PNG: ${buffer.length} bytes is too short for an IHDR`);
  }
  if (!buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error("not a PNG: bad signature");
  }
  const ihdrLength = buffer.readUInt32BE(8);
  const ihdrType = buffer.toString("latin1", 12, 16);
  if (ihdrType !== "IHDR" || ihdrLength !== 13) {
    throw new Error(`not a PNG: first chunk is ${ihdrType} (${ihdrLength} bytes), not IHDR`);
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    bitDepth: buffer[24],
    colorType: buffer[25],
  };
}

/**
 * Enforce the gate: whole PNG, at most 1 MiB, at most 1024x1024.
 * Returns the parsed header on success; throws a message naming the
 * failed limit otherwise.
 */
export function validateEntry(buffer: Buffer): PngInfo {
  if (buffer.length > GATE.maxBytes) {
    throw new Error(
      `gate failed: entry is ${buffer.length} bytes, over the ${GATE.maxBytes} byte cap`,
    );
  }
  const info = parsePng(buffer);
  if (info.width > GATE.maxWidth || info.height > GATE.maxHeight) {
    throw new Error(
      `gate failed: entry is ${info.width}x${info.height}, over the ` +
        `${GATE.maxWidth}x${GATE.maxHeight} cap`,
    );
  }
  if (info.width === 0 || info.height === 0) {
    throw new Error("gate failed: entry has a zero dimension");
  }
  return info;
}

/** Where the grader reads the entry from; override locally with OUTPUT_DIR. */
export function outputDir(): string {
  return process.env.OUTPUT_DIR ?? "/output";
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, "assets", "meme.png");
  if (!existsSync(source)) {
    throw new Error(`entry asset missing: ${source}`);
  }
  const bytes = readFileSync(source);
  const info = validateEntry(bytes);

  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const outPath = join(dir, "entry.png");
  writeFileSync(outPath, bytes);

  // Read-back verification: the file on disk must be byte-identical to
  // the validated asset, so a partial write can never slip through.
  const written = readFileSync(outPath);
  if (!written.equals(bytes)) {
    throw new Error(`read-back mismatch: ${outPath} differs from assets/meme.png`);
  }
  const sha256 = createHash("sha256").update(written).digest("hex");
  console.log(
    `entry.png: ${info.width}x${info.height} PNG, ${written.length} bytes, sha256 ${sha256}`,
  );
  console.log(`wrote ${outPath}`);
}

main();
