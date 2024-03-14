CREATE DATABASE database_cursos;

USE database_cursos;


CREATE TABLE users(
    registroAcademico INT(9) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(25) NOT NULL,
    password VARCHAR(20) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    PRIMARY KEY (registroAcademico)
);


DESCRIBE users;

CREATE TABLE cursos (
    codigo INT(4) NOT NULL,
    nombreCurso VARCHAR(75) NOT NULL,
    catedratico VARCHAR(50) NOT NULL,
    PRIMARY KEY (codigo)
);

CREATE TABLE publicaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_registroAcademico INT(9) NOT NULL,
    curso_codigo INT(4) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- indices a las columnas en las tablas users y cursos
ALTER TABLE users ADD INDEX idx_registroAcademico (registroAcademico);
ALTER TABLE cursos ADD INDEX idx_codigo (codigo);

-- Restricciones de clave externa
ALTER TABLE publicaciones ADD CONSTRAINT fk_usuario_registroAcademico FOREIGN KEY (usuario_registroAcademico) REFERENCES users(registroAcademico);
ALTER TABLE publicaciones ADD CONSTRAINT fk_curso_codigo FOREIGN KEY (curso_codigo) REFERENCES cursos(codigo);
