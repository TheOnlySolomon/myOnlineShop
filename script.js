// CloverCali homepage interactions

const track = document.querySelector(".drops-track");
const cards = [...document.querySelectorAll(".drop-card")];
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");
const dots = [...document.querySelectorAll(".carousel-dots span")];

let currentSlide = 0;

function visibleCards() {
    return window.innerWidth <= 600 ? 1 : window.innerWidth <= 850 ? 1 : 2;
}

function updateCarousel() {
    if (!track || cards.length === 0) return;

    const visible = visibleCards();
    const maxSlide = Math.max(0, cards.length - visible);
    currentSlide = Math.min(currentSlide, maxSlide);

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;

    track.style.transform =
        `translateX(-${currentSlide * (cardWidth + gap)}px)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });
}

nextButton?.addEventListener("click", () => {
    const maxSlide = Math.max(0, cards.length - visibleCards());
    currentSlide = Math.min(currentSlide + 1, maxSlide);
    updateCarousel();
});

prevButton?.addEventListener("click", () => {
    currentSlide = Math.max(currentSlide - 1, 0);
    updateCarousel();
});

window.addEventListener("resize", updateCarousel);
updateCarousel();

const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    formMessage.textContent =
        "Thanks! Your message has been received.";

    contactForm.reset();
});
