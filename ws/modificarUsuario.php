<?php

header('Content-Type: application/json');

require_once __DIR__ . '/../vendor/autoload.php';

use App\Database\Conexion;
use App\Models\User;

try {
    $conexion = new Conexion();
    $pdo = $conexion->getConexion();

    // Validar ID
    if (!isset($_GET['id']) || $_GET['id'] === '') {
        echo json_encode([
            'success' => false,
            'message' => 'ID no especificado',
            'data' => null
        ]);
        exit;
    }

    $id = (int)$_GET['id'];

    $updateFields = [];
    $updateParams = [':id' => $id];

    $fieldsMapping = [
        'nombre' => 'nombre',
        'apellidos' => 'apellidos',
        'email' => 'email',
        'telefono' => 'telefono',
        'fecha_nacimiento' => 'fecha_nacimiento',
        'contrasenya' => 'password',
        'sexo' => 'sexo'
    ];

    foreach ($fieldsMapping as $postKey => $dbCol) {
        if (isset($_POST[$postKey]) && $_POST[$postKey] !== '') {
            $updateFields[] = "$dbCol = :$postKey";
            $updateParams[":$postKey"] = $_POST[$postKey];
        }
    }

    if (!empty($updateFields)) {
        $sql = "UPDATE alumno SET " . implode(', ', $updateFields) . " WHERE id = :id";
        $stmtUpdate = $pdo->prepare($sql);
        $stmtUpdate->execute($updateParams);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Modificado correctamente usuario con ID: ' . $id,
        'data' => null
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage(),
        'data' => null
    ]);
}
