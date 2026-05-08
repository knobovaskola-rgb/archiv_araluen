<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Archiv Araluenu | Muzeum hraničářů</title>

    <link rel="stylesheet" href="css/araluencss.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Lora&display=swap" rel="stylesheet">
</head>
<body>

<nav class="navbar">
    <a href="#" class="logo">
        <img src="img/dublist.png" alt="Logo Archivu">
    </a>

    <h2>Archiv Araluenu</h2>

    <ul class="nav-links">
        <li><a href="#expozice">Expozice</a></li>
        <li><a href="#rezervace">Rezervace</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#mapa">Mapa</a></li>
    </ul>

    <div class="burger">
        <div></div><div></div><div></div>
    </div>
</nav>

<header class="hero">
    <div class="hero-content">
        <h1>Rozšíření výstavy</h1>
        <p>Morgarathova vojska začínají za:</p>
        <div id="countdown" class="timer"></div>
    </div>
</header>

<main>

<section class="carousel-section">
    <div class="carousel-container">
        <button class="prev">❮</button>

        <div class="carousel-slide">
            <img src="img/mistnost1.2.png">
            <img src="img/mistnost2.png">
            <img src="img/mistnost3.2.png">
            <img src="img/mistnost4.2.png">
        </div>

        <button class="next">❯</button>
    </div>
</section>

<section id="expozice" class="expozice-grid">
    <h2>Vzácné exponáty</h2>
    <div class="grid-wrapper">
        <?php include 'php/load_expozice.php'; ?>
    </div>
</section>

<section id="rezervace" class="booking-section">
    <h2>Žádost o audienci</h2>

    <form id="reservation-form" method="POST" action="php/rezervace.php">

        <div class="form-row">
            <label>Datum <input type="date" name="datum" required></label>
            <label>Čas <input type="time" name="cas" required></label>
            <label>Počet osob <input type="number" name="osob" min="1" required></label>
        </div>

        <label>Typ:
            <select name="typ">
                <option value="ucen">Učeň</option>
                <option value="hranicar">Hraničář</option>
                <option value="garda">Královská garda</option>
            </select>
        </label>

        <label>Email:
            <input type="email" name="email" required>
        </label>

        <button type="submit" class="btn-rezervace">Rezervace</button>
    </form>
</section>

<section id="faq">
    <!-- beze změny -->
</section>

<section id="mapa">
    <h2>Kde nás hledat</h2>

    <div class="map-wrapper">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!..." loading="lazy"></iframe>

        <p class="map-text">
            Muzeum není skutečné...
        </p>
    </div>
</section>

</main>

<footer>
    <p>Archiv Araluenu</p>
</footer>

<script src="js/jsaraluen.js"></script>

</body>
</html>