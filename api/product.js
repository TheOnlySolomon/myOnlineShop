const { getPool } = require("../myOnlineShop/lib/db");

module.exports = async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const pool = getPool();
        const result = await pool.query(
            "SELECT id, name, price, stock FROM products WHERE stock > 0 ORDER BY id"
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Failed to fetch products:", err.message);
        res.status(500).json({ error: "Unable to load products right now" });
    }
};