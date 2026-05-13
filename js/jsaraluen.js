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
    // Tady si nastavuješ datum konce odpočtu
    const targetDate = new Date("June 30, 2026 10:00:00").getTime();

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

const timerElement = document.querySelector('.timer');
const messageElement = document.getElementById('countdown-message');

const countdown = setInterval(() => {

    if (distance < 0) {
        clearInterval(countdown);
        timerElement.style.display = "none";
        messageElement.style.display = "inline-block";
    }
}, 1000);

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
        const response = await fetch('./data/expozice.csv');
        if (!response.ok) throw new Error('Soubor expozice.csv nebyl nalezen');
        
        const textData = await response.text();
        const radky = textData.split('\n').filter(line => line.trim() !== '');
        
        let htmlObsah = '';

        radky.forEach((radek, index) => {
            // Přeskakujeme první řádek (pokud máš v CSV hlavičku)
            if (index === 0) return;

            const sloupce = radek.split(';');
            
            if (sloupce.length >= 3) {
                const nazev = sloupce[0].trim();
                const popis = sloupce[1].trim();
                const obrazek = sloupce[2].trim();
                
                htmlObsah += `
                    <div class="exponat">
                        <img src="./img/${obrazek}" alt="${nazev}" style="width:100%; border-radius:8px; margin-bottom:10px; height: 250px; object-fit: contain;">
                        <h3>${nazev}</h3>
                        <p>${popis}</p>
                    </div>
                `;
            }
        });

        container.innerHTML = htmlObsah || '<p>Žádné exponáty k zobrazení.</p>';

    } catch (error) {
        console.error('Chyba při načítání exponátů:', error);
        container.innerHTML = '<p>Nepodařilo se načíst data z expozice.</p>';
    }
}

// Spuštění po načtení DOMu
document.addEventListener('DOMContentLoaded', () => {
    nactiExpozici();
    initOstatniFunkce();
});

// ==========================
// OSTATNÍ FUNKCE (Smooth Scroll & Form)
// ==========================
function initOstatniFunkce() {
    // --- FORM VALIDACE ---
    const form = document.getElementById("reservation-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            // Získání hodnot ze všech polí
            const date = form.querySelector("input[name='datum']").value.trim();
            const time = form.querySelector("input[name='cas']").value.trim();
            const people = form.querySelector("input[name='osob']").value.trim();
            const email = form.querySelector("input[name='email']").value.trim();
            
            // Kontrola selectu (pokud ho tam máš)
            const typeSelect = form.querySelector("select[name='typ']");
            const type = typeSelect ? typeSelect.value : "ok";

            // PŘÍSNÁ KONTROLA: Pokud je cokoli prázdné nebo počet osob menší než 1
            if (!date || !time || !people || !email || type === "" || people < 1) {
                e.preventDefault(); // Zastaví odeslání
                alert("Musíte vyplnit celý dotazník."); // Tvoje hláška
            }
        });
    }

    // --- SMOOTH SCROLL ---
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
