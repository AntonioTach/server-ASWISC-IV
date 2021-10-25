CREATE DATABASE database_aswisc;

USE DATABASE database_aswisc;

CREATE TABLE especialistas(
    id_especialista INT(12) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    profesion VARCHAR(30) NOT NULL,
    telefono BIGINT NOT NULL,
    estudios VARCHAR(20) NOT NULL,
    nacimiento DATE NOT NULL,
    usuario VARCHAR(16) NOT NULL,
    contrasena VARCHAR(60) NOT NULL,
    foto_profesional VARCHAR(MAX) NOT NULL,
    curriculum VARCHAR(MAX) NOT NULL,
    cedula VARCHAR(MAX) NOT NULL
);
ALTER TABLE especialistas
    ADD PRIMARY KEY (id_especialista);

ALTER TABLE especialistas
    MODIFY id_especialista INT(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE pacientes(
    id_paciente INT(11) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(60) NOT NULL,
    email VARCHAR(40) NOT NULL,
    contrasena VARCHAR(50) NOT NULL,
    sexo VARCHAR(10)  NULL,
    nacimiento DATE NOT NULL,
    telefono BIGINT NOT NULL,
    nombretutor VARCHAR(100) NULL,
    telefonotutor BIGINT  NULL,
    id_especialista int(12) NULL
);
ALTER TABLE pacientes
    ADD PRIMARY KEY (id_paciente);

ALTER TABLE pacientes
    MODIFY id_paciente INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

ALTER TABLE pacientes
    FOREIGN KEY (`id_especialista`) REFERENCES `especialistas`(`id_especialista`);

CREATE TABLE pruebas(
	id_pruebas INT(11) NOT NULL,
	id_paciente INT(11) NOT NULL,
	nombre_prueba VARCHAR(50) NOT NULL,
	comentarios VARCHAR(200) NOT NULL,
	documento VARCHAR(MAX) NOT NULL
);
ALTER TABLE pruebas
    ADD PRIMARY KEY (id_pruebas);

ALTER TABLE pruebas
    MODIFY id_pruebas INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

ALTER TABLE pruebas
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente);

CREATE TABLE tareas(
    id_tarea INT(11) NOT NULL,
    id_paciente INT(11) NOT NULL,
    titulo VARCHAR(20) NOT NULL,
    descripcion VARCHAR(150) NOT NULL,
    documento VARCHAR(200) NOT NULL
);
ALTER TABLE tareas
    ADD PRIMARY KEY (id_tarea);

ALTER TABLE tareas
    ADD CONSTRAINT id_pacientefk FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente);

ALTER TABLE tareas
    MODIFY id_tarea INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE expediente(
    id_expedienteclinico INT(11) NOT NULL,
    id_paciente INT(11) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    telefono BIGINT NOT NULL,
    sexo VARCHAR NOT NULL,
    nacimiento DATE NOT NULL,
    usuario VARCHAR(20) NOT NULL,
    email VARCHAR(60) NOT NULL,
    origen_procedencia VARCHAR(40) NOT NULL,
    ocupacion VARCHAR(40) NOT NULL,
    estudios VARCHAR(40) NOT NULL
);

ALTER TABLE expediente
    ADD PRIMARY KEY (id_expedienteclinico);

ALTER TABLE expediente
    MODIFY id_expedienteclinico INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

ALTER TABLE expediente
    FOREIGN KEY (`id_paciente`) REFERENCES `pacientes`(`id_paciente`);

CREATE TABLE articulos(
    id_articulo INT(11) NOT NULL,
    estado_articulo INT(5) NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    descripcion VARCHAR (200) NOT NULL,
    fecha_publicacion DATE NOT NULL,
    id_especialista INT(12) NOT NULL
);

ALTER TABLE articulos
    ADD PRIMARY KEY (id_articulo);

ALTER TABLE articulos
    MODIFY id_articulo INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

ALTER TABLE articulos
    ADD CONSTRAINT id_especialistafk FOREIGN KEY (id_especialista) REFERENCES especialistas(id_especialista);
