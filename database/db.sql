CREATE DATABASE appwebdb;

USE appwebdb;

CREATE TABLE usuarios (
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    registroAcademico INT(9) NOT NULL PRIMARY KEY,
    password VARCHAR(20) NOT NULL,
    correo VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cursos (
    codigoCurso INT NOT NULL PRIMARY KEY,
    nombreCurso VARCHAR(70) NOT NULL,
    creditos INT NOT NULL,
    catedratico VARCHAR(100) NOT NULL
);

CREATE TABLE publicaciones (
    idPublicacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario INT NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    codigoCurso INT NOT NULL,
    comentario TEXT,
    FOREIGN KEY (usuario) REFERENCES usuarios(registroAcademico),
    FOREIGN KEY (codigoCurso) REFERENCES cursos(codigoCurso)
);

CREATE TABLE catedraticos (
    idCatedratico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    codigoCurso INT NOT NULL,
    FOREIGN KEY (codigoCurso) REFERENCES cursos(codigoCurso)
);

CREATE TABLE comentarios (
    idComentario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario INT NOT NULL,
    publicacion INT NOT NULL,
    comentario TEXT,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario) REFERENCES usuarios(registroAcademico),
    FOREIGN KEY (publicacion) REFERENCES publicaciones(idPublicacion)
);

