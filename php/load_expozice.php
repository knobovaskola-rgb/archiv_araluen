<?php

$file = fopen(__DIR__ . "/../data/expozice.csv", "r");

if ($file) {

    while (($row = fgetcsv($file, 1000, ",")) !== false) {

        echo "<div class='karta'>";

        echo "<img src='" . htmlspecialchars($row[3]) . "' alt=''>";

        echo "<h3>" . htmlspecialchars($row[0]) . "</h3>";

        echo "<p>" . htmlspecialchars($row[1]) . "</p>";

        echo "<span class='stitek'>" . htmlspecialchars($row[2]) . "</span>";

        echo "</div>";
    }

    fclose($file);

} else {
    echo "<p>Expozice se nepodařilo načíst.</p>";
}