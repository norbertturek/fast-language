import { PrismaClient } from "@prisma/client";

/**
 * Build database URL from individual Neon environment variables
 * Used when DATABASE_URL is not directly set (Vercel + Neon integration)
 */
function buildDatabaseUrl(): string | undefined {
  // If DATABASE_URL is set, use it directly (local dev with Docker)
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // Build from Neon individual variables (Vercel deployment)
  const user = process.env.PGUSER;
  const password = process.env.PGPASSWORD;
  // Neon uses different variable names - check both
  const host = process.env.POSTGRES_HOST || process.env.PGHOST;
  const database = process.env.PGDATABASE;

  if (user && password && host && database) {
    return `postgresql://${user}:${encodeURIComponent(
      password
    )}@${host}/${database}?sslmode=require`;
  }

  return undefined;
}

const databaseUrl = buildDatabaseUrl();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: databaseUrl,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
