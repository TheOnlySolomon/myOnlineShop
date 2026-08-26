const { getPool } = require("../lib/db");

module.exports = async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const pool = getPool();
        const result = await pool.query(
            "SELECT id, name, price, stock FROM products WHERE stock > 0 ORDER BY id"
        );
        return res.status(200).json(result.rows);
    } catch (err) {
        console.error("API ROUTE ERROR:", err);
        return res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
};