import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { delimiter, extname, join } from 'node:path';
import process from 'node:process';

const args = process.argv.slice(2);
let timeoutMs = 0;
let heartbeatMs = 0;
let idleTimeoutMs = 0;
let label = 'command';
const envOverrides = new Map();
let commandIndex = args.indexOf('--');

const optionArgs = args.slice(0, commandIndex === -1 ? args.length : commandIndex);
for (const arg of optionArgs) {
  if (arg.startsWith('--timeout=')) {
    timeoutMs = Number.parseInt(arg.slice('--timeout='.length), 10);
  } else if (arg.startsWith('--heartbeat=')) {
    heartbeatMs = Number.parseInt(arg.slice('--heartbeat='.length), 10);
  } else if (arg.startsWith('--idle-timeout=')) {
    idleTimeoutMs = Number.parseInt(arg.slice('--idle-timeout='.length), 10);
  } else if (arg.startsWith('--label=')) {
    label = arg.slice('--label='.length);
  } else if (arg.startsWith('--env=')) {
    const assignment = arg.slice('--env='.length);
    const equalsIndex = assignment.indexOf('=');
    if (equalsIndex <= 0) {
      console.error(`[guarded-command] invalid --env value: ${assignment}`);
      process.exit(2);
    }
    envOverrides.set(assignment.slice(0, equalsIndex), assignment.slice(equalsIndex + 1));
  }
}

if (commandIndex === -1 || !Number.isFinite(timeoutMs) || timeoutMs <= 0) {
  console.error(
    'usage: node scripts/guarded-command.mjs --timeout=<ms> [--heartbeat=<ms>] [--idle-timeout=<ms>] [--label=<text>] [--env=KEY=VALUE ...] -- <command> [...args]',
  );
  process.exit(2);
}

const command = args.slice(commandIndex + 1);
if (command.length === 0) {
  console.error('[guarded-command] missing command');
  process.exit(2);
}

if (
  (heartbeatMs !== 0 && (!Number.isFinite(heartbeatMs) || heartbeatMs <= 0)) ||
  (idleTimeoutMs !== 0 && (!Number.isFinite(idleTimeoutMs) || idleTimeoutMs <= 0))
) {
  console.error('[guarded-command] heartbeat and idle-timeout must be positive millisecond values');
  process.exit(2);
}

const childEnv = { ...process.env };
for (const [key, value] of envOverrides) {
  childEnv[key] = value;
}

const startedAt = Date.now();
let lastOutputAt = startedAt;
let lastOutputLine = '';
let stdoutBytes = 0;
let stderrBytes = 0;
let finished = false;
let terminating = false;
let child;

function formatDuration(ms) {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return minutes === 0
    ? `${remainingSeconds}s`
    : `${minutes}m ${remainingSeconds.toString().padStart(2, '0')}s`;
}

function commandText() {
  return command.map((part) => (/\s/.test(part) ? JSON.stringify(part) : part)).join(' ');
}

function resolveWindowsCommand(commandName) {
  if (process.platform !== 'win32' || /[\\/]/.test(commandName)) {
    return commandName;
  }

  const pathEntries = (childEnv.PATH ?? '').split(delimiter).filter(Boolean);
  const extensions = extname(commandName)
    ? ['']
    : (childEnv.PATHEXT ?? '.COM;.EXE;.BAT;.CMD').split(';').filter(Boolean);

  for (const pathEntry of pathEntries) {
    for (const extension of extensions) {
      const candidate = join(pathEntry, `${commandName}${extension.toLowerCase()}`);
      if (existsSync(candidate)) {
        return candidate;
      }

      const upperCandidate = join(pathEntry, `${commandName}${extension.toUpperCase()}`);
      if (existsSync(upperCandidate)) {
        return upperCandidate;
      }
    }
  }

  return commandName;
}

function quoteForCmd(value) {
  const text = String(value);
  if (!/[\s&()^|<>]/.test(text)) {
    return text;
  }

  return `"${text.replaceAll('"', '""')}"`;
}

function getSpawnCommand() {
  const executable = resolveWindowsCommand(command[0]);
  const executableExt = extname(executable).toLowerCase();

  if (process.platform === 'win32' && (executableExt === '.bat' || executableExt === '.cmd')) {
    return {
      executable: 'cmd.exe',
      args: [
        '/d',
        '/s',
        '/c',
        [quoteForCmd(executable), ...command.slice(1).map(quoteForCmd)].join(' '),
      ],
    };
  }

  return { executable, args: command.slice(1) };
}

function writeStatus(prefix = 'running') {
  const now = Date.now();
  console.error(
    `[guarded-command] ${label} ${prefix} elapsed=${formatDuration(now - startedAt)} idle=${formatDuration(
      now - lastOutputAt,
    )} pid=${child?.pid ?? 'unknown'} stdout=${stdoutBytes}B stderr=${stderrBytes}B`,
  );
}

function killProcessTree() {
  if (!child?.pid || terminating) {
    return;
  }

  terminating = true;

  if (process.platform === 'win32') {
    const killer = spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], {
      stdio: 'inherit',
      windowsHide: true,
    });
    killer.on('error', (error) => {
      console.error(`[guarded-command] taskkill failed: ${error.message}`);
      child.kill('SIGTERM');
    });
    return;
  }

  child.kill('SIGTERM');
  setTimeout(() => {
    if (!finished) {
      child.kill('SIGKILL');
    }
  }, 5_000).unref();
}

function failFast(reason) {
  if (finished) {
    return;
  }

  console.error(`[guarded-command] ${label} ${reason}`);
  console.error(`[guarded-command] command: ${commandText()}`);
  writeStatus('diagnostic');
  if (lastOutputLine) {
    console.error(`[guarded-command] last output: ${lastOutputLine}`);
  }
  console.error('[guarded-command] failing fast for investigation');
  killProcessTree();
}

function recordOutput(data, streamName) {
  lastOutputAt = Date.now();
  const byteLength = Buffer.byteLength(data);
  if (streamName === 'stdout') {
    stdoutBytes += byteLength;
  } else {
    stderrBytes += byteLength;
  }

  const lines = data.toString().trim().split(/\r?\n/).filter(Boolean);
  if (lines.length > 0) {
    lastOutputLine = lines.at(-1);
  }
}

try {
  const spawnCommand = getSpawnCommand();
  child = spawn(spawnCommand.executable, spawnCommand.args, {
    cwd: process.cwd(),
    env: childEnv,
    shell: false,
    stdio: ['inherit', 'pipe', 'pipe'],
    windowsHide: true,
  });
} catch (error) {
  console.error(`[guarded-command] failed to start ${label}: ${error.message}`);
  console.error(`[guarded-command] command: ${commandText()}`);
  process.exit(1);
}

const timers = [
  setTimeout(() => {
    failFast(`exceeded timeout=${timeoutMs}ms`);
  }, timeoutMs),
];

if (heartbeatMs > 0) {
  timers.push(
    setInterval(() => {
      writeStatus();
    }, heartbeatMs),
  );
}

if (idleTimeoutMs > 0) {
  timers.push(
    setInterval(
      () => {
        if (Date.now() - lastOutputAt >= idleTimeoutMs) {
          failFast(`exceeded idle-timeout=${idleTimeoutMs}ms`);
        }
      },
      Math.min(idleTimeoutMs, 5_000),
    ),
  );
}

child.stdout.on('data', (data) => {
  recordOutput(data, 'stdout');
  process.stdout.write(data);
});

child.stderr.on('data', (data) => {
  recordOutput(data, 'stderr');
  process.stderr.write(data);
});

function clearTimers() {
  finished = true;
  for (const timer of timers) {
    clearTimeout(timer);
    clearInterval(timer);
  }
}

child.on('error', (error) => {
  clearTimers();
  console.error(`[guarded-command] failed to start ${label}: ${error.message}`);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  clearTimers();

  if (signal) {
    console.error(`[guarded-command] ${label} exited with signal ${signal}`);
    process.exit(1);
  }

  process.exit(code ?? 1);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    console.error(`[guarded-command] ${label} received ${signal}; terminating child tree`);
    killProcessTree();
  });
}
