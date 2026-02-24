<?php

namespace App\Models;

class User{
    private int $id;
    private string $nombre;
    private string $apellidos;
    private ?string $email;
    private ?string $telefono;
    private string $fecha_nacimiento;
    private string $contrasenya;
    private ?string $sexo;

    public function __construct( int $id, string $nombre, string $apellidos, ?string $email, ?string $telefono, string $fecha_nacimiento, string $contrasenya, ?string $sexo) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->email = $email;
        $this->telefono = $telefono;
        $this->fecha_nacimiento = $fecha_nacimiento;
        $this->contrasenya = $contrasenya;
        $this->sexo = $sexo;
    }

    public function toArray(): array {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'apellidos' => $this->apellidos,
            'email' => $this->email,
            'telefono' => $this->telefono,
            'fecha_nacimiento' => $this->fecha_nacimiento,
            'password' => $this->contrasenya,
            'sexo' => $this->sexo
        ];
    }
}