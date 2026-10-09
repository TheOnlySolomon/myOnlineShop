
const menuButton = document.querySelector("#menuButton");
const dashboardMenu = document.querySelector("#dashboardMenu");
const menuBackdrop = document.querySelector("#menuBackdrop");

function closeMenu() {
    dashboardMenu.classList.remove("active");
    menuBackdrop.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
    const isOpen = dashboardMenu.classList.toggle("active");

    menuBackdrop.classList.toggle("active", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
});

menuBackdrop.addEventListener("click", closeMenu);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
});

dashboardMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Product search and category filter
const searchInput = document.querySelector("#productSearch");
const categoryFilter = document.querySelector("#categoryFilter");
const cards = document.querySelectorAll(".product-card");
const noProducts = document.querySelector("#noProducts");

function filterProducts() {
    const term = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    let visibleCount = 0;

    cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesName = name.includes(term);
        const matchesCategory =
            category === "all" || cardCategory === category;

        const visible = matchesName && matchesCategory;

        card.hidden = !visible;

        if (visible) visibleCount++;
    });

    noProducts.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// Show and hide the filter dropdown
const filterButton = document.querySelector("#filterButton");
const filterOptions = document.querySelector("#filterOptions");

filterButton.addEventListener("click", () => {
    const isOpen = filterOptions.hidden;
    filterOptions.hidden = !isOpen;
    filterButton.setAttribute("aria-expanded", String(isOpen));
});

// Header search icon focuses the search field
document.querySelector("#searchButton").addEventListener("click", () => {
    searchInput.focus();
    searchInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});