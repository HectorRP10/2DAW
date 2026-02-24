<?php

header('Content-Type: application/json');

require_once __DIR__ . '/../vendor/autoload.php';

use App\Database\Conexion;
use App\Models\User;


// Primero verificamos si se debe modificar
if (isset($_POST['id']) && $_POST['id'] !== '') {
    $_GET['id'] = $_POST['id'];
    require_once __DIR__ . '/modificarUsuario.php';
    exit;
}

$nombre = $_POST['nombre'] ?? '';
$apellidos = $_POST['apellidos'] ?? '';
$email = $_POST['email'] ?? null;
$telefono = $_POST['telefono'] ?? null;
$fecha_nacimiento = $_POST['fecha_nacimiento'] ?? '';
$contrasenya = $_POST['contrasenya'] ?? '';
$sexo = $_POST['sexo'] ?? null;
        
try{
    $conexion = new Conexion();
    $pdo = $conexion->getConexion();
    $stmt = $pdo->prepare('INSERT INTO alumno (nombre, apellidos, email, telefono, fecha_nacimiento, password, sexo) VALUES (:nombre, :apellidos, :email, :telefono, :fecha_nacimiento, :password, :sexo)');
    $stmt->execute([
        ':nombre' => $nombre,
        ':apellidos' => $apellidos,
        ':email' => $email,
        ':telefono' => $telefono,
        ':fecha_nacimiento' => $fecha_nacimiento,
        ':password' => $contrasenya,
        ':sexo' => $sexo
    ]);

    $newId = (int) $pdo->lastInsertId();

    $user = new User(
        $newId,
        $nombre,
        $apellidos,
        $email,
        $telefono,
        $fecha_nacimiento,
        $contrasenya,
        $sexo
    );

    echo json_encode([
        'success' => true,
        'message' => 'Usuario creado correctamente',
        'data' => $user->toArray()
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage(),
        'data' => null
    ]);
}