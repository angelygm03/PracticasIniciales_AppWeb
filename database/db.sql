CREATE DATABASE appwebdb;

USE appwebdb;

CREATE TABLE usuarios (
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    registroAcademico INT(9) NOT NULL PRIMARY KEY,
    password VARCHAR(20) NOT NULL,
    correo VARCHAR(50) NOT NULL UNIQUE
);
