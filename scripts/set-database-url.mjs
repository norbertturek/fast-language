#!/usr/bin/env node
/**
 * Helper script to set DATABASE_URL from Neon environment variables
 * for Prisma CLI commands (db push, migrate, generate, etc.)
 *
 * Usage: node scripts/set-database-url.js <command>
 * Example: node scripts/set-database-url.js "npx prisma db push"
 */

import { execSync } from "child_process";

function buildDatabaseUrl() {
    // If DATABASE_URL is already set, use it
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }

    // Build from individual Neon variables
    const user = process.env.PGUSER;
    const password = process.env.PGPASSWORD;
    const host = process.env.POSTGRES_HOST;
    const database = process.env.PGDATABASE;

    if (user && password && host && database) {
        return `postgresql://${user}:${encodeURIComponent(password)}@${host}/${database}?sslmode=require`;
    }

    return null;
}

const command = process.argv.slice(2).join(' ');

if (!command) {
    console.error('Usage: node scripts/set-database-url.js <command>');
    process.exit(1);
}

const databaseUrl = buildDatabaseUrl();

if (!databaseUrl) {
    console.error('Error: Could not build DATABASE_URL. Make sure either:');
    console.error('  - DATABASE_URL is set, or');
    console.error('  - PGUSER, PGPASSWORD, POSTGRES_HOST, and PGDATABASE are all set');
    process.exit(1);
}

console.log('📦 Database URL configured');
console.log(`🚀 Running: ${command}\n`);

try {
    execSync(command, {
        stdio: 'inherit',
        env: {
            ...process.env,
            DATABASE_URL: databaseUrl,
        },
    });
} catch (error) {
    process.exit(error.status || 1);
}
