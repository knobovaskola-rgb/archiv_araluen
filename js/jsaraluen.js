// ==========================
// BURGER MENU
// ==========================
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

if (burger && nav) {
    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}


// ==========================
// COUNTDOWN
// ==========================
const countdown = document.getElementById("countdown");

if (countdown) {
    const targetDate = new Date("May 30, 2026 10:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            countdown.innerHTML = "Výstava právě začala!";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);

        countdown.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}


// ==========================
// CAROUSEL
// ==========================
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const slide = document.querySelector(".carousel-slide");

if (nextBtn && prevBtn && slide) {
    let index = 0;
    const total = slide.children.length;

    function updateCarousel() {
        slide.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
        index++;
        if (index >= total) index = 0;
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        index--;
        if (index < 0) index = total - 1;
        updateCarousel();
    });

    // AUTOPLAY
    setInterval(() => {
        index++;
        if (index >= total) index = 0;
        updateCarousel();
    }, 5000);
}


// ==========================
// FORM VALIDACE
// ==========================
const form = document.getElementById("reservation-form");

if (form) {
    form.addEventListener("submit", (e) => {
        const date = form.querySelector("input[name='datum']").value;
        const time = form.querySelector("input[name='cas']").value;
        const people = form.querySelector("input[name='osob']").value;
        const email = form.querySelector("input[name='email']").value;

        if (!date || !time || people < 1 || !email) {
            e.preventDefault();
            alert("Prosím vyplňte všechny údaje správně.");
        }
    });
}


// ==========================
// SMOOTH SCROLL (navbar fix)
// ==========================
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener("click", function(e) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();

            const offset = 80; // výška navbaru
            const position = target.offsetTop - offset;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });
        }
    });
});