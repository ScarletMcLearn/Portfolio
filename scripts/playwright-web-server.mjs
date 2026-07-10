import { spawn } from 'node:child_process';
import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const guardedCommand = path.join(scriptDir, 'guarded-command.mjs');
const projectRoot = path.dirname(scriptDir);
const distRoot = path.join(projectRoot, 'dist');
const host = '127.0.0.1';
const port = 4321;
const buildTimeoutMs = Number.parseInt(process.env.PLAYWRIGHT_BUILD_TIMEOUT_MS ?? '120000', 10);
const astroEnv = {
  ...process.env,
  ASTRO_TELEMETRY_DISABLED: '1',
  CI: process.env.CI ?? 'true',
  SITE_BASE: '/',
};
const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.pdf', 'application/pdf'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

function formatDuration(ms) {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return minutes === 0 ? `${remainingSeconds}s` : `${minutes}m ${remainingSeconds.toString().padStart(2, '0')}s`;
}

function runAstroBuild() {
  const startedAt = Date.now();
  console.error(`[playwright-web-server] build start timeout=${buildTimeoutMs}ms`);

  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [
      guardedCommand,
      `--timeout=${buildTimeoutMs}`,
      '--heartbeat=15000',
      '--idle-timeout=90000',
      '--label=preview-e2e-build',
      '--',
      'pixi',
      'run',
      'build',
    ], {
      cwd: projectRoot,
      env: astroEnv,
      stdio: 'inherit',
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('exit', (code, signal) => {
      if (signal) {
        reject(new Error(`pixi run build exited via signal ${signal}`));
        return;
      }

      if (code === 0) {
        console.error(`[playwright-web-server] build complete elapsed=${formatDuration(Date.now() - startedAt)}`);
        resolve();
        return;
      }

      reject(new Error(`pixi run build exited with code ${code ?? 'unknown'}`));
    });
  });
}

function sanitizeRequestPath(rawPath = '/') {
  const decoded = decodeURIComponent(new URL(rawPath, 'http://localhost').pathname);
  const withoutBase =
    decoded === '/Portfolio' || decoded.startsWith('/Portfolio/')
      ? decoded.slice('/Portfolio'.length) || '/'
      : decoded;

  return withoutBase || '/';
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveFilePath(requestPath) {
  const normalizedPath = sanitizeRequestPath(requestPath);
  const trimmed = normalizedPath.replace(/^\/+/, '');
  const candidates =
    trimmed.length === 0
      ? [path.join(distRoot, 'index.html')]
      : [
          path.join(distRoot, trimmed),
          path.join(distRoot, `${trimmed}.html`),
          path.join(distRoot, trimmed, 'index.html'),
        ];

  for (const candidate of candidates) {
    const relativeCandidate = path.relative(distRoot, candidate);
    if (
      relativeCandidate.startsWith('..') ||
      path.isAbsolute(relativeCandidate) ||
      !(await fileExists(candidate))
    ) {
      continue;
    }

    return { status: 200, filePath: candidate };
  }

  return { status: 404, filePath: path.join(distRoot, '404.html') };
}

async function sendFile(response, filePath, status) {
  const fileStat = await stat(filePath);
  const extension = path.extname(filePath);
  const contentType = mimeTypes.get(extension) ?? 'application/octet-stream';

  response.writeHead(status, {
    'Content-Length': fileStat.size,
    'Content-Type': contentType,
  });

  createReadStream(filePath).pipe(response);
}

async function startServer() {
  console.error(`[playwright-web-server] serve start root=${distRoot}`);

  await access(path.join(distRoot, 'index.html'));
  await access(path.join(distRoot, '404.html'));

  const server = http.createServer(async (request, response) => {
    try {
      const { status, filePath } = await resolveFilePath(request.url ?? '/');
      await sendFile(response, filePath, status);
    } catch (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Internal Server Error');
      console.error(error);
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => {
      console.error(`[playwright-web-server] serving ${distRoot} at http://${host}:${port}`);
      resolve();
    });
  });

  const closeServer = () => {
    server.close(() => {
      process.exit(0);
    });
  };

  process.once('SIGINT', closeServer);
  process.once('SIGTERM', closeServer);
}

try {
  await runAstroBuild();
  await startServer();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
