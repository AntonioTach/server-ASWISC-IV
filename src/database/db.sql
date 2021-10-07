CREATE DATABASE database_links;

USE database_links;
--ESPECIALISTAS TABLE
CREATE TABLE especialistas(
    id_especialistas INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    fecha_de_nacimiento DATE NOT NULL,
    profesion VARCHAR(30) NOT NULL,
    grado_estudios VARCHAR(20) NOT NULL,
    correo VARCHAR(50) NOT NULL
    );

ALTER TABLE especialistas
    ADD PRIMARY KEY (id_especialistas);

ALTER TABLE especialistas
    MODIFY id_especialistas INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE especialistas;

--LINKS TABLE
CREATE TABLE links (
    id INT(11) NOT NULL,
    title VARCHAR (150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES especialistas(id_especialistas)
);

ALTER TABLE links 
    ADD PRIMARY KEY (id);

ALTER TABLE links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE links;