# Clover Calisthenics - Online Shop

An e-commerce web application built for **Clover Calisthenics**, designed to showcase and sell calisthenics equipment, apparel, and training programs.

---

## 🚀 Features

* **Product Showcase:** Responsive catalog displaying available calisthenics gear and apparel.
* **Seamless Checkout:** Smooth user flow leading to confirmation pages (`success.html`).
* **Backend API Integration:** Server-side operations handled via modular API endpoints.
* **Database Management:** SQL schema for storing product catalog, user data, and order details.

---

## 📁 Repository Structure

```text
.
├── 🎨 FRONTEND (Client-Side)
│   ├── index.html          # Main storefront page
│   ├── success.html        # Order confirmation page (handles Stripe success redirects)
│   ├── script.js           # Client-side UI logic, API fetches, and checkout triggers
│   └── style.css           # Custom styling and responsive design layouts
│
├── ⚙️ BACKEND (Server-Side)
│   ├── api/
│   │   ├── checkout.js     # Serverless route to securely create Stripe sessions
│   │   ├── products.js     # Serverless route to fetch product listings
│   │   └── verify-session.js # Serverless route to validate completed Stripe payments
│   └── lib/
│       └── db.js           # Shared database helper for PostgreSQL connection pooling
│
├── 🛠️ DATABASE & CONFIGURATION
│   ├── .env.local          # Private environment variables (DB URL, Stripe keys)
│   ├── database.sql        # Database schema definitions and initial seed data
│   ├── test-db.js          # Local utility script to verify database connectivity
│   ├── package.json        # Node.js dependencies and project scripts
│   ├── LICENSE             # Open-source license details
│   └── README.md           # Project documentation


