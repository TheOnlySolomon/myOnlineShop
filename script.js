async function loadProducts() {

    const container = document.getElementById("products");



    try {

        const response = await fetch("/api/products");

        if (!response.ok) throw new Error("Request failed");



        const products = await response.json();



        if (products.length === 0) {

            container.innerHTML = "<p>No products available right now.</p>";

            return;

        }



        container.innerHTML = "";

        products.forEach(product => container.appendChild(buildProductCard(product)));



    } catch (err) {

        console.error("Failed to load products:", err);

        container.innerHTML = "<p>Couldn't load products. Please try again later.</p>";

    }

}



function buildProductCard(product) {

    const card = document.createElement("div");

    card.className = "product";



    const title = document.createElement("h2");

    title.textContent = product.name;



    const price = document.createElement("p");

    price.textContent = `$${(product.price / 100).toFixed(2)}`;



    const button = document.createElement("button");

    button.textContent = "Buy";

    button.addEventListener("click", () => buy(product.id, button));



    card.append(title, price, button);

    return card;

}



async function buy(productId, button) {

    button.disabled = true;

    button.textContent = "Redirecting…";



    try {

        const response = await fetch("/api/checkout", {

            method: "POST",

            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({ productId, quantity: 1 })

        });



        const result = await response.json();



        if (!response.ok) {

            throw new Error(result.error || "Checkout failed");

        }



        window.location.href = result.url;



    } catch (err) {

        console.error("Checkout error:", err);

        alert(err.message || "Something went wrong starting checkout.");

        button.disabled = false;

        button.textContent = "Buy";

    }

}



loadProducts();