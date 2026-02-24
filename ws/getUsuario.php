<?php

header('Content-Type: application/json');

require_once __DIR__ . '/../vendor/autoload.php';

use App\Database\Conexion;
use App\Models\User;

try {
    $conexion = new Conexion();
    $pdo = $conexion->getConexion();

    // Con parámetro
    if (isset($_GET['id']) && $_GET['id'] !== '') {
        $id = (int) $_GET['id'];
        
        $stmt = $pdo->prepare('SELECT * FROM alumno WHERE id = :id');
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            echo json_encode([
                'success' => false,
                'message' => 'Usuario no encontrado con ID: ' . $id,
                'data' => null
            ]);
            exit;
        }

        $user = new User(
            (int) $row['id'],
            $row['nombre'],
            $row['apellidos'],
            $row['email'],
            $row['telefono'],
            $row['fecha_nacimiento'],
            $row['password'],
            $row['sexo']
        );

        echo json_encode([
            'success' => true,
            'message' => 'Usuario obtenido correctamente',
            'data' => $user->toArray()
        ]);
        exit;
    }

    // Sin parámetro
    $stmt = $pdo->query('SELECT * FROM alumno');
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $users = [];
    foreach ($rows as $row) {
        $user = new User(
            (int) $row['id'],
            $row['nombre'],
            $row['apellidos'],
            $row['email'],
            $row['telefono'],
            $row['fecha_nacimiento'],
            $row['password'],
            $row['sexo']
        );
        $users[] = $user->toArray();
    }

    echo json_encode([
        'success' => true,
        'message' => 'Listado de alumnos obtenido correctamente',
        'data' => $users
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage(),
        'data' => null
    ]);
}