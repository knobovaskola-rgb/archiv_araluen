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

    setInterval(() => {
        index++;
        if (index >= total) index = 0;
        updateCarousel();
    }, 5000);
}

// ==========================
// VZÁCNÉ EXPONÁTY (Načítání z CSV)
// ==========================
async function nactiExpozici() {
    const container = document.getElementById('expozice-container');
    if (!container) return;

    try {
        // Cesta k souboru (přidáno ./ pro lepší kompatibilitu s GitHubem)
        const response = await fetch('./data/expozice.csv');
        if (!response.ok) throw new Error('Soubor expozice.csv nebyl nalezen');
        
        const textData = await response.text();
        
        // Rozdělení na řádky a odstranění prázdných řádků
        const radky = textData.split('\n').filter(line => line.trim() !== '');
        
        let htmlObsah = '';

        radky.forEach((radek, index) => {
            // Přeskočíme první řádek (hlavičku: Název;Popis;Obrázek)
            if (index === 0) return;

            // Rozdělení podle středníku
            const sloupce = radek.split(';');
            
            // Musíme mít alespoň 3 sloupce (Název, Popis, Obrázek)
            if (sloupce.length >= 3) {
                const nazev = sloupce[0].trim();
                const popis = sloupce[1].trim();
                const obrazek = sloupce[2].trim();
                
                htmlObsah += `
                    <div class="exponat">
                        <img src="./img/${obrazek}" alt="${nazev}" style="width:100%; border-radius:8px; margin-bottom:10px;">
                        <h3>${nazev}</h3>
                        <p>${popis}</p>
                    </div>
                `;
            }
        });

        if (htmlObsah === '') {
            container.innerHTML = '<p>Žádné exponáty k zobrazení.</p>';
        } else {
            container.innerHTML = htmlObsah;
        }

    } catch (error) {
        console.error('Chyba při načítání exponátů:', error);
        container.innerHTML = '<p>Nepodařilo se načíst data z expozice.</p>';
    }
}

// Spuštění po načtení DOMu
document.addEventListener('DOMContentLoaded', () => {
    nactiExpozici();
    
    // Smooth scroll a validace zůstávají zde
    initOstatniFunkce();
});

// ==========================
// OSTATNÍ FUNKCE (Smooth Scroll & Form)
// ==========================
function initOstatniFunkce() {
    // Form validace
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

    // Smooth Scroll
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href === "#") return;
            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const offset = 80;
                const position = target.offsetTop - offset;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });
            }
        });
    });
}
