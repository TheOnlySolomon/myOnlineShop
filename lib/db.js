const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");

// Manually parse .env.local if DATABASE_URL isn't set
if (!process.env.DATABASE_URL) {
    const envPath = path.resolve(__dirname, "../.env.local");
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, "utf8");
        envConfig.split("\n").forEach((line) => {
            const [key, ...values] = line.split("=");
            if (key && values.length > 0) {
                process.env[key.trim()] = values.join("=").trim();
            }
        });
    }
}

let pool;

function getPool() {
    if (!pool) {
        const connectionString = process.env.DATABASE_URL;

        if (!connectionString) {
            throw new Error("DATABASE_URL is missing from environment variables.");
        }

        pool = new Pool({
            connectionString,
            ssl: { rejectUnauthorized: false }
        });
    }
    return pool;
}

module.exports = { getPool };