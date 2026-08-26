const { Pool } = require('pg');

console.log("Testing connection string:", process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function test() {
    try {
        const res = await pool.query("SELECT * FROM products");
        console.log("SUCCESS! Rows found:", res.rows);
    } catch (err) {
        console.error("DATABASE CONNECTION FAILED:", err);
    } finally {
        await pool.end();
    }
}

test();