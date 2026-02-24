<?php

namespace App\Database;

use PDO;

Class Conexion{
	
	protected $conexion_db;
	
	public function __construct(){
		$this->conexion_db = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET,DB_USER,DB_PASS);
		$this->conexion_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
    
    public function getConexion() {
        return $this->conexion_db;
    }
}