const Stripe = require("stripe");
const { getPool } = require("../myOnlineShop/lib/db");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { session_id } = req.query || {};
    if (!session_id) {
        return res.status(400).json({ error: "Missing session_id" });
    }

    const pool = getPool();

    try {
        // If this session was already recorded (e.g. the user refreshed the
        // success page), return the existing order instead of processing it again.
        const existing = await pool.query(
            "SELECT id, total FROM orders WHERE stripe_session_id = $1",
            [session_id]
        );
        if (existing.rows[0]) {
            return res.status(200).json({
                status: "paid",
                orderId: existing.rows[0].id,
                total: existing.rows[0].total
            });
        }

        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status !== "paid") {
            return res.status(200).json({ status: session.payment_status });
        }

        const productId = parseInt(session.metadata.productId, 10);
        const quantity = parseInt(session.metadata.quantity, 10);
        const total = session.amount_total;

        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            await client.query(
                "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1",
                [quantity, productId]
            );

            const orderResult = await client.query(
                `INSERT INTO orders (product_id, quantity, total, status, stripe_session_id)
                 VALUES ($1, $2, $3, 'paid', $4)
                 RETURNING id`,
                [productId, quantity, total, session_id]
            );

            await client.query("COMMIT");

            res.status(200).json({
                status: "paid",
                orderId: orderResult.rows[0].id,
                total
            });
        } catch (txErr) {
            await client.query("ROLLBACK");
            throw txErr;
        } finally {
            client.release();
        }
    } catch (err) {
        console.error("Session verification failed:", err.message);
        res.status(500).json({ error: "Unable to verify payment" });
    }
};