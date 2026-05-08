<?php

$file = fopen("data/expozice.csv", "r");

if ($file) {

    while (($row = fgetcsv($file, 1000, ",")) !== FALSE) {

        echo "<div class='karta'>";

        echo "<img src='{$row[3]}' alt='{$row[0]}'>";

        echo "<h3>{$row[0]}</h3>";

        echo "<p>{$row[1]}</p>";

        echo "<span class='stitek'>{$row[2]}</span>";

        echo "</div>";
    }

    fclose($file);

} else {

    echo "<p>Expozice se nepodařilo načíst.</p>";
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $datum = htmlspecialchars($_POST["datum"]);
    $cas = htmlspecialchars($_POST["cas"]);
    $osob = htmlspecialchars($_POST["osob"]);
    $typ = htmlspecialchars($_POST["typ"]);
    $email = htmlspecialchars($_POST["email"]);

    $zapis = "
Datum: $datum
Čas: $cas
Počet osob: $osob
Typ vstupenky: $typ
Email: $email
-------------------------
";

    file_put_contents("../data/rezervace.txt", $zapis, FILE_APPEND);

    echo "
    <h1>Rezervace byla úspěšně odeslána!</h1>
    <a href='../index.php'>Zpět na hlavní stránku</a>
    ";
}

<form id="reservation-form" method="POST" action="php/rezervace.php">
?>