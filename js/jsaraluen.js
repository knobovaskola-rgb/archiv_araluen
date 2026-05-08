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

// ==========================
// VZÁCNÉ EXPONÁTY
// ==========================

async function nactiExpozici() {
    const container = document.getElementById('expozice-container');
    if (!container) return;

    try {
        // Načtení souboru expozice.csv
        const response = await fetch('data/expozice.csv');
        const data = await response.text();
        
        // Rozdělení na řádky
        const radky = data.split('\n');
        
        let htmlObsah = '';
        
        // Projdeme řádky (přeskočíme první, pokud je to záhlaví)
        radky.forEach((radek, index) => {
            if (radek.trim() === '' || index === 0) return;
            
            // Rozdělení řádku podle středníku (podle tvého load_expozice.php)
            const sloupce = radek.split(';');
            
            if (sloupce.length >= 2) {
                const nazev = sloupce[0].trim();
                const popis = sloupce[1].trim();
                const obrazek = sloupce[2].trim();
                
                // Vytvoření HTML pro jeden exponát
                htmlObsah += `
                    <div class="exponat">
                        <h3>${nazev}</h3>
                        <p>${popis}</p>
                    </div>
                `;
            }
        });
        
        container.innerHTML = htmlObsah;
    } catch (error) {
        console.error('Chyba při načítání CSV:', error);
        container.innerHTML = '<p>Nepodařilo se načíst exponáty.</p>';
    }
}

// Spustit po načtení stránky
document.addEventListener('DOMContentLoaded', nactiExpozici);
async function nactiExpozici() {
    const container = document.getElementById('expozice-container');
    if (!container) return;

    try {
        const response = await fetch('data/expozice.csv');
        const data = await response.text();
        const radky = data.split('\n');
        let htmlObsah = '';

        radky.forEach((radek, index) => {
            if (radek.trim() === '' || index === 0) return;
            const sloupce = radek.split(';');
            
            if (sloupce.length >= 3) {
                const nazev = sloupce[0].trim();
                const popis = sloupce[1].trim();
                const obrazek = sloupce[2].trim();
                
                htmlObsah += `
                    <div class="exponat">
                        <img src="img/${obrazek}" alt="${nazev}" style="width:100%; border-radius:8px;">
                        <h3>${nazev}</h3>
                        <p>${popis}</p>
                    </div>
                `;
            }
        });
        container.innerHTML = htmlObsah;
    } catch (error) {
        console.error('Chyba:', error);
    }
}
document.addEventListener('DOMContentLoaded', nactiExpozici);
