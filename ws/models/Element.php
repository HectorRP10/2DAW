<?php

require_once __DIR__ . '/../interfaces/IToJson.php';

class Element implements IToJson {

    private $nombre;
    private $apellidos;
    private $email;
    private $telefono;
    private $curso;
    private $contrasenya;
    private $sexo;


    public function __construct( $nombre, $apellidos, $email, $telefono, $curso, $contrasenya, $sexo) {
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->email = $email;
        $this->telefono = $telefono;
        $this->curso = $curso;
        $this->sexo = $sexo;
        $this->contrasenya = $contrasenya;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function getApellidos() {
        return $this->apellidos;
    }

    public function setApellidos($apellidos) {
        $this->apellidos = $apellidos;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getTelefono() {
        return $this->telefono;
    }

    public function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    public function getCurso() {
        return $this->curso;
    }

    public function setCurso($curso) {
        $this->curso = $curso;
    }

    public function getContrasenya() {
        return $this->contrasenya;
    }

    public function setContrasenya($contrasenya) {
        $this->contrasenya = $contrasenya;
    }

    public function getSexo() {
        return $this->sexo;
    }

    public function setSexo($sexo) {
        $this->sexo = $sexo;
    }

    public function toJson() {
        return json_encode([
            'nombre' => $this->nombre,
            'apellidos' => $this->apellidos,
            'email' => $this->email,
            'telefono' => $this->telefono,
            'curso' => $this->curso,
            'contrasenya' => $this->contrasenya,
            'sexo' => $this->sexo
        ]);
    }
}
