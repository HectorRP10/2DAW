<?php

require_once __DIR__ . '/models/Element.php';

$nombre = $_POST['nombre'] ?? null;
$apellidos = $_POST['apellidos'] ?? null;
$email = $_POST['email'] ?? null;
$telefono = $_POST['telefono'] ?? null;
$curso = $_POST['curso'] ?? null;
$contrasenya = $_POST['contrasenya'] ?? null;
$sexo = $_POST['sexo'] ?? null;

$elemento = new Element($nombre, $apellidos, $email, $telefono, $curso, $contrasenya, $sexo);

$archivo = __DIR__ . '/elementos.txt';

file_put_contents($archivo, $elemento->toJson() . PHP_EOL, FILE_APPEND);

header('Content-Type: application/json');
echo $elemento->toJson();
