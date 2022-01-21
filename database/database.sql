CREATE DATABASE database_aswisc;

USE DATABASE database_aswisc;

CREATE TABLE usuarios(
    id_usuario INT(12) NOT NULL,
    usuario VARCHAR(16) NOT NULL,
    contrasena VARCHAR(40) NOT NULL,
    id_tipo INT(12) NOT NULL
);

ALTER TABLE usuarios
    ADD PRIMARY KEY (id_usuario);

ALTER TABLE usuarios
    MODIFY id_usuario INT(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;


CREATE TABLE especialistas(
    id_especialista INT(12) NOT NULL,
    id_usuario INT(12) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    profesion VARCHAR(30) NOT NULL,
    telefono BIGINT NOT NULL,
    sexo varchar(20) NULL,  
    estudios VARCHAR(20) NOT NULL,
    nacimiento DATE NOT NULL,
    foto_profesional VARCHAR(200) NOT NULL,
    curriculum VARCHAR(200) NOT NULL,
    cedula VARCHAR(200) NOT NULL,
    precio_consulta_general int(12) NULL,
    ocupacion VARCHAR(100) NULL,
    origen VARCHAR(100) NULL,
    estudios VARCHAR(100) NULL,
    observaciones VARCHAR(500) NULL
);
ALTER TABLE especialistas
    ADD PRIMARY KEY (id_especialista);

ALTER TABLE especialistas
    MODIFY id_especialista INT(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE pacientes(
    id_paciente INT(12) NOT NULL,
    id_usuario int(12) NOT NULL,
    id_especialista int(12) NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(40) NOT NULL,
    sexo VARCHAR(10) NULL,
    nacimiento DATE NOT NULL,
    telefono BIGINT NOT NULL,
    nombretutor VARCHAR(100) NULL,
    telefonotutor BIGINT NULL,
    precio_consulta_pacientes int(12) NOT NULL
);
ALTER TABLE pacientes
    ADD PRIMARY KEY (id_paciente);

ALTER TABLE pacientes
    MODIFY id_paciente INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

ALTER TABLE pacientes
     ADD CONSTRAINT id_especialista FOREIGN KEY (id_especialista) REFERENCES especialistas(id_especialista);


CREATE TABLE pruebas(
	id_pruebas INT(11) NOT NULL,
	id_paciente INT(11) NOT NULL,
	nombre_prueba VARCHAR(50) NOT NULL,
	comentarios VARCHAR(200) NOT NULL,
	documento VARCHAR(200) NOT NULL
);
ALTER TABLE pruebas
    ADD PRIMARY KEY (id_pruebas);

ALTER TABLE pruebas
    MODIFY id_pruebas INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

ALTER TABLE pruebas
    ADD CONSTRAINT id_paciente FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente);

CREATE TABLE tareas(
    id_tarea INT(11) NOT NULL,
    id_paciente INT(11) NOT NULL,
    titulo VARCHAR(20) NOT NULL,
    descripcion VARCHAR(300) NOT NULL,
    documento VARCHAR(300) NOT NULL
);
ALTER TABLE tareas
    ADD PRIMARY KEY (id_tarea);

ALTER TABLE tareas
    ADD CONSTRAINT id_pacientefk FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente);

ALTER TABLE tareas
    MODIFY id_tarea INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE expedientes(
    id_expedienteclinico INT(11) NOT NULL,
    id_paciente INT(11) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    telefono BIGINT NOT NULL,
    sexo VARCHAR(11) NOT NULL,
    nacimiento DATE NOT NULL,
    usuario VARCHAR(20) NOT NULL,
    email VARCHAR(60) NOT NULL,
    origen_procedencia VARCHAR(40) NOT NULL,
    ocupacion VARCHAR(40) NOT NULL,
    estudios VARCHAR(40) NOT NULL
);

ALTER TABLE expedientes
    ADD PRIMARY KEY (id_expedienteclinico);

ALTER TABLE expedientes
    MODIFY id_expedienteclinico INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

ALTER TABLE expedientes
    ADD CONSTRAINT id_pacientefke FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente);

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

-- FK de Especialistas
ALTER TABLE especialistas
    ADD CONSTRAINT id_usuarioEspecialistafk FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);

 -- FK de Pacientes
ALTER TABLE pacientes
    ADD CONSTRAINT id_usuarioPacientefk FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);

CREATE TABLE pagos(
    precio DECIMAL(5,5) NOT NULL,
    id_paciente INT(11) NOT NULL,
    id_especialista INT(12) NOT NULL,
    fecha DATE NULL
);

ALTER TABLE pagos
    ADD CONSTRAINT id_especialistafkpagos FOREIGN KEY (id_especialista) REFERENCES especialistas(id_especialista);

ALTER TABLE pagos
    ADD CONSTRAINT id_pacientefkpagos FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente);

ALTER TABLE pagos
    ADD PRIMARY KEY (precio);

CREATE TABLE horarios(
    precio DECIMAL(5,5) NOT NULL,
    id_paciente INT(11) NOT NULL,
    id_especialista INT(12) NOT NULL,
    fecha DATE NULL,
    hora VARCHAR(30) NULL
);

ALTER TABLE horarios
    ADD PRIMARY KEY (hora);

ALTER TABLE horarios
    ADD CONSTRAINT id_pacientefkhorarios FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente);


ALTER TABLE horarios
    ADD CONSTRAINT id_especialistafkhorarios FOREIGN KEY (id_especialista) REFERENCES especialistas(id_especialista);

CREATE TABLE pagos(

);