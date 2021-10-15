CREATE DATABASE database_aswisc;

USE DATABASE database_aswisc;


CREATE TABLE especialistas(
    id_especialista INT(11) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    profesion VARCHAR(30) NOT NULL,
    telefono BIGINT NOT NULL,
    estudios VARCHAR(20) NOT NULL,
    nacimiento DATE NOT NULL,
    usuario VARCHAR(16) NOT NULL,
    contrasena VARCHAR(60) NOT NULL
);

ALTER TABLE especialistas
    ADD PRIMARY KEY (id_especialista);

ALTER TABLE especialistas
    MODIFY id_especialista INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE especialistas;

CREATE TABLE pacientes{
    id_paciente INT(11) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(60) NOT NULL,
    email VARCHAR(40) NOT NULL,
    contraseña VARCHAR(50) NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    telefono BIGINT NOT NULL,
    nombretutor VARCHAR(100) NOT NULL,
    telefonotutor BIGINT NOT NULL
}

ALTER TABLE pacientes
    ADD PRIMARY KEY (id_paciente);

ALTER TABLE pacientes
    MODIFY id_paciente INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;