import { NextResponse } from "next/server";

// DEBUG endpoint - remove in production!
// GET /api/debug - Check environment variables
export async function GET() {
  const envVars = {
    hasNeonVars: {
      PGUSER: !!process.env.PGUSER,
      PGPASSWORD: !!process.env.PGPASSWORD,
      PGDATABASE: !!process.env.PGDATABASE,
      POSTGRES_HOST: !!process.env.POSTGRES_HOST,
      PGHOST: !!process.env.PGHOST,
      PGHOST_UNPOOLED: !!process.env.PGHOST_UNPOOLED,
    },
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    hasPostgresUrl: !!process.env.POSTGRES_URL,
    hasPostgresUrlNoSsl: !!process.env.POSTGRES_URL_NO_SSL,
    // Show partial values for debugging (hide sensitive parts)
    pgUserPrefix: process.env.PGUSER?.substring(0, 3) + "...",
    postgresHostPrefix: process.env.POSTGRES_HOST?.substring(0, 10) + "...",
    pgHostPrefix: process.env.PGHOST?.substring(0, 10) + "...",
  };

  return NextResponse.json(envVars);
}
