const Stripe = require("stripe");
const { getPool } = require("../myOnlineShop/lib/db");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { productId, quantity } = req.body || {};
    const qty = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;

    if (!Number.isInteger(productId)) {
        return res.status(400).json({ error: "Invalid product id" });
    }

    try {
        const pool = getPool();

        // Price and stock always come from the database, never from the client,
        // so a tampered request can't change what the customer is charged.
        const result = await pool.query(
            "SELECT id, name, price, stock FROM products WHERE id = $1",
            [productId]
        );
        const product = result.rows[0];

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        if (product.stock < qty) {
            return res.status(409).json({ error: "Not enough stock available" });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: product.name },
                        unit_amount: product.price // stored in cents
                    },
                    quantity: qty
                }
            ],
            metadata: {
                productId: String(product.id),
                quantity: String(qty)
            },
            success_url: `${process.env.BASE_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/index.html`
        });

        res.status(200).json({ url: session.url });
    } catch (err) {
        console.error("Checkout session creation failed:", err.message);
        res.status(500).json({ error: "Unable to start checkout" });
    }
};