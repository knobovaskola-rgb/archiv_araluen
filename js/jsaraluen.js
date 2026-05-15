// ==========================
// BURGER MENU
// ==========================
function initBurger() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    if (burger && nav) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }
}

// ==========================
// COUNTDOWN
// ==========================
function initCountdown() {
    const countdownElement = document.getElementById("countdown");
    const messageElement = document.getElementById('countdown-message');
    const timerWrapper = document.querySelector('.timer');
    
    if (!countdownElement) return;

    const targetDate = new Date("June 30, 2026 10:00:00").getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            if (timerWrapper) timerWrapper.style.display = "none";
            if (messageElement) {
                messageElement.style.display = "block";
                messageElement.innerHTML = "VÝSTAVA PRÁVĚ ZAČALA!";
            }
            return true; // Signalizace konce
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);

        countdownElement.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
        return false;
    };

    const isFinished = updateTimer();
    if (!isFinished) {
        setInterval(updateTimer, 1000);
    }
}

// ==========================
// VZÁCNÉ EXPONÁTY
// ==========================
async function nactiExpozici() {
    const container = document.getElementById('expozice-container');
    if (!container) return;

    try {
        // Zkontroluj, zda je cesta './data/expozice.csv' správně!
        const response = await fetch('./data/expozice.csv');
        if (!response.ok) throw new Error('Soubor expozice.csv nebyl nalezen');
        
        const textData = await response.text();
        const radky = textData.split('\n').map(r => r.trim()).filter(line => line !== '');
        
        let htmlObsah = '';
        radky.forEach((radek, index) => {
            if (index === 0) return; // Přeskočit hlavičku

            const sloupce = radek.split(';');
            if (sloupce.length >= 3) {
                const nazev = sloupce[0];
                const popis = sloupce[1];
                const obrazek = sloupce[2];
                
                htmlObsah += `
                    <div class="exponat">
                        <img src="./img/${obrazek}" alt="${nazev}">
                        <h3>${nazev}</h3>
                        <p>${popis}</p>
                    </div>
                `;
            }
        });
        container.innerHTML = htmlObsah || '<p>Žádné exponáty k zobrazení.</p>';
    } catch (error) {
        console.error('Chyba:', error);
        container.innerHTML = '<p>Nepodařilo se načíst exponáty. Zkontrolujte soubor CSV.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('csv-carousel-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    async function loadPremiery() {
        try {
            // Změna názvu souboru na vystava.csv
            const response = await fetch('./data/vystava.csv'); 
            if (!response.ok) throw new Error("Soubor vystava.csv nenalezen.");
            
            const data = await response.text();
            const rows = data.split(/\r?\n/).filter(r => r.trim() !== "");
            
            // Vymazání slideru před naplněním (pro jistotu)
            slider.innerHTML = "";

            // Začínáme od i=1 (přeskočení hlavičky)
            for (let i = 1; i < rows.length; i++) {
                const cols = rows[i].split(';');
                if (cols.length >= 3) {
                    const card = document.createElement('div');
                    card.className = 'carousel-card';
                    card.innerHTML = `
                        <img src="img/${cols[2].trim()}" alt="${cols[0].trim()}">
                        <div class="carousel-text-overlay">
                            <h3>${cols[0].trim()}</h3>
                            <p>${cols[1].trim()}</p>
                        </div>
                    `;
                    slider.appendChild(card);
                }
            }
        } catch (error) {
            console.error("Chyba při načítání premiér:", error);
        }
    }

    function updateSlider() {
        const cards = document.querySelectorAll('.carousel-card');
        if (cards.length === 0) return;
        
        if (currentIndex >= cards.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = cards.length - 1;
        
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => { currentIndex++; updateSlider(); });
    prevBtn.addEventListener('click', () => { currentIndex--; updateSlider(); });

    loadPremiery();
});
// ==========================
// OSTATNÍ (Carousel, Form, Scroll)
// ==========================
function initOstatni() {
    // Carousel
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const slide = document.querySelector(".carousel-slide");
    if (nextBtn && prevBtn && slide) {
        let index = 0;
        const total = slide.children.length;
        const update = () => slide.style.transform = `translateX(-${index * 100}%)`;
        nextBtn.addEventListener("click", () => { index = (index + 1) % total; update(); });
        prevBtn.addEventListener("click", () => { index = (index - 1 + total) % total; update(); });
    }

    // Rezervace
    const form = document.getElementById("reservation-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            const inputs = form.querySelectorAll("input[required]");
            let valid = true;
            inputs.forEach(i => { if(!i.value.trim()) valid = false; });
            if (!valid) {
                e.preventDefault();
                alert("Musíte vyplnit celý dotazník.");
            }
        });
    }
}

// SPOUŠTĚČ
document.addEventListener('DOMContentLoaded', () => {
    initBurger();
    initCountdown();
    nactiExpozici();
    initOstatni();
});
