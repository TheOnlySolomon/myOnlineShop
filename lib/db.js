const { Pool } = require("pg");

// Reused across invocations when the serverless function stays warm.
let pool;

function getPool() {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false } // required by most hosted Postgres providers (Neon, Supabase, etc.)
        });
    }
    return pool;
}

module.exports = { getPool };