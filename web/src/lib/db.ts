import { Pool, QueryResult, QueryResultRow } from "pg";

let pool: Pool;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<QueryResult<T>> {
  const pool = getPool();
  try {
    const start = Date.now();
    const result = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    console.log("[EXECUTED QUERY]:", { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error("[DATABASE QUERY ERROR]:", { text, error });
    throw error;
  }
}
