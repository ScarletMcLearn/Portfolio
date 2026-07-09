import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);

const [, , bin, ...args] = process.argv;

if (!bin) {
  console.error('usage: node scripts/run-local-bin.mjs <bin> [...args]');
  process.exit(1);
}

const root = process.cwd();
const binDir = path.join(root, 'node_modules', '.bin');
const candidates = process.platform === 'win32'
  ? [path.join(binDir, `${bin}.cmd`), path.join(binDir, `${bin}.ps1`), path.join(binDir, bin)]
  : [path.join(binDir, bin)];

const file = candidates.find((candidate) => fs.existsSync(candidate));

if (!file) {
  console.error(`missing local bin: ${bin}`);
  process.exit(1);
}

const content = fs.readFileSync(file, 'utf8');
const match = [
  ...content.matchAll(/["']\$basedir\/(?<target>\.\.\/[^"'\s]+)["']/g),
  ...content.matchAll(/["']%~dp0\\(?<target>\.\.\\[^"'\s]+)["']/g),
].at(-1);

if (!match?.groups?.target) {
  console.error(`unable to resolve local bin target: ${bin}`);
  process.exit(1);
}

const entry = path.resolve(path.dirname(file), match.groups.target.replaceAll(/[\\/]/g, path.sep));

if (bin === 'astro') {
  process.env.ASTRO_TELEMETRY_DISABLED = '1';
}

const previousArgv = process.argv;
process.argv = [process.execPath, entry, ...args];

try {
  if (entry.endsWith('.mjs')) {
    await import(pathToFileURL(entry).href);
  } else {
    require(entry);
  }
} finally {
  process.argv = previousArgv;
}
