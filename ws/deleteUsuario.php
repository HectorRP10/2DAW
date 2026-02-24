<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../vendor/autoload.php';

use App\Database\Conexion;

try{
    $conexion = new Conexion();
    $pdo = $conexion->getConexion();

    if (isset($_GET['id']) && $_GET['id'] !== '') {
        $id = (int) $_GET['id'];
        
        $stmt = $pdo->prepare('DELETE FROM alumno WHERE id = :id');
        $stmt->execute([':id' => $id]);

        echo json_encode([
            'success' => true,
            'message' => 'Eliminado correctamente usuario con ID: ' . $id,
            'data' => null
        ]);
        exit;
    }

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage(),
        'data' => null
    ]);
}