import { Pool } from 'pg'

let pool: Pool | undefined

function getPool() {
  if (!pool) {
    const { databaseUrl } = useRuntimeConfig()
    pool = new Pool({
      connectionString: databaseUrl,
      max: 1, // serverless: short-lived invocations, avoid a large pool
      // No explicit `ssl` override: Neon's certificate is properly CA-signed,
      // so `sslmode=require` in the connection string is enough to get full
      // verification. Forcing `rejectUnauthorized: false` would disable cert
      // checking entirely and isn't needed here.
    })
  }
  return pool
}

export function query<T extends Record<string, unknown> = Record<string, unknown>>(
  text: string,
  params?: unknown[],
) {
  return getPool().query<T>(text, params)
}
