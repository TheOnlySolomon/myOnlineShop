CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    total INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    stripe_session_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, price, stock)
VALUES
('Black T-Shirt', 3990, 20),
('White Hoodie', 5990, 10),
('Black Cap', 1990, 30);