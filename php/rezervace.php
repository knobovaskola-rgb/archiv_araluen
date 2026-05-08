<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $datum = htmlspecialchars($_POST["datum"] ?? '');
    $cas = htmlspecialchars($_POST["cas"] ?? '');
    $osob = htmlspecialchars($_POST["osob"] ?? '');
    $typ = htmlspecialchars($_POST["typ"] ?? '');
    $email = htmlspecialchars($_POST["email"] ?? '');

    $zapis = "Datum: $datum\nČas: $cas\nPočet osob: $osob\nTyp: $typ\nEmail: $email\n-----------------\n";

    file_put_contents(__DIR__ . "/../data/rezervace.txt", $zapis, FILE_APPEND);

    header("Location: ../index.php?success=1");
    exit;
}