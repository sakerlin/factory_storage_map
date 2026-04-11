import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const backendRoot = path.resolve(process.cwd());
const schemaPath = path.join(backendRoot, 'prisma', 'schema.prisma');
const sqlPath = path.join(backendRoot, 'prisma', 'generated-init.sql');
const schemaDir = path.dirname(schemaPath);

function resolveSqlitePath(databaseUrl) {
  const prefix = 'file:';
  if (!databaseUrl || !databaseUrl.startsWith(prefix)) {
    return null;
  }
  return path.resolve(schemaDir, databaseUrl.slice(prefix.length));
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: backendRoot,
    encoding: 'utf8',
    ...options,
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `${command} failed`);
  }

  return result.stdout;
}

try {
  const sqlitePath = resolveSqlitePath(process.env.DATABASE_URL);
  if (sqlitePath && fs.existsSync(sqlitePath)) {
    fs.rmSync(sqlitePath, { force: true });
  }

  const diffCommand = process.platform === 'win32'
    ? ['cmd.exe', ['/c', 'npx', 'prisma', 'migrate', 'diff', '--from-empty', '--to-schema-datamodel', schemaPath, '--script']]
    : ['npx', ['prisma', 'migrate', 'diff', '--from-empty', '--to-schema-datamodel', schemaPath, '--script']];

  const sql = run(diffCommand[0], diffCommand[1]);

  fs.writeFileSync(sqlPath, sql, 'utf8');

  const executeCommand = process.platform === 'win32'
    ? ['cmd.exe', ['/c', 'npx', 'prisma', 'db', 'execute', '--file', sqlPath, '--schema', schemaPath]]
    : ['npx', ['prisma', 'db', 'execute', '--file', sqlPath, '--schema', schemaPath]];

  run(executeCommand[0], executeCommand[1]);

  console.log(`SQLite schema initialized from ${schemaPath}`);
} catch (error) {
  console.error('Failed to initialize SQLite schema:', error.message);
  process.exitCode = 1;
}
