const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "appwebdb"
});

// Para verificar la conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.post('/registro', (req, res) => {
    const { nombre, apellido, registroAcademico, password, correo } = req.body;
    
    if (!nombre || !apellido || !registroAcademico || !password || !correo) {
        return res.status(400).json({ error: "Por favor, completa todos los campos requeridos" });
    }

    const sql = "INSERT INTO usuarios (nombre, apellido, registroAcademico, password, correo) VALUES (?, ?, ?, ?, ?)";
    const values = [nombre, apellido, registroAcademico, password, correo];
    
    db.query(sql, values, (err, result) => {
        if(err) {
            console.log("Error inserting data:", err);
            return res.status(500).json({ error: "Error al guardar en la base de datos" });
        }
        console.log("Data inserted successfully");
        return res.json({ message: "Datos guardados en la base de datos" });
    });
});

app.post('/', (req, res) => {
    const sql = "SELECT * FROM usuarios WHERE registroAcademico = ? AND password = ?";
    const values = [
        req.body.registroAcademico,
        req.body.password
    ]
    console.log('Datos de la solicitud:', req.body);
    
    db.query(sql, [req.body.registroAcademico, req.body.password], (err, data) => {
        if(err) {
            console.log("Error al ejecutar la consulta SQL:", err);
            return res.json("Error");
        }
        console.log('Datos obtenidos de la base de datos:', data);
        
        if(data.length > 0) {
            console.log("Inicio de sesión exitoso");
            return res.json("Success");
        } else {
            console.log("Inicio de sesión fallido");
            return res.json("Failed");
        }
    });
});

app.get('/cursos', (req, res) => {
    const sql = "SELECT codigoCurso, nombreCurso FROM cursos";
    
    db.query(sql, (err, data) => {
        if(err) {
            console.log("Error al ejecutar la consulta SQL:", err);
            return res.status(500).json({ error: "Error al recuperar los cursos de la base de datos" });
        }
        console.log('Cursos obtenidos de la base de datos:', data);
        
        return res.json(data);
    });
});

app.get('/catedraticos/:codigoCurso', (req, res) => {
    const codigoCurso = req.params.codigoCurso;
    const sql = "SELECT idCatedratico, CONCAT(nombre, ' ', apellido) AS nombreCompleto FROM catedraticos WHERE codigoCurso = ?";
    
    db.query(sql, [codigoCurso], (err, data) => {
        if(err) {
            console.log("Error al ejecutar la consulta SQL:", err);
            return res.status(500).json({ error: "Error al recuperar los catedráticos de la base de datos" });
        }
        console.log('Catedráticos obtenidos de la base de datos:', data);
        
        return res.json(data);
    });
});

app.post('/publicaciones', (req, res) => {
    console.log('Solicitud POST recibida en /publicaciones:', req.body);
    const { registroAcademico, codigoCurso, idCatedratico, comentario } = req.body;
    
    const sql = "INSERT INTO publicaciones (registroAcademico, codigoCurso, idCatedratico, comentario) VALUES (?, ?, ?, ?)";
    const values = [registroAcademico, codigoCurso, idCatedratico, comentario];
    
    db.query(sql, values, (err, result) => {
        if(err) {
            console.error("Error al insertar en la base de datos:", err); 
            return res.status(500).json({ error: "Error al guardar en la base de datos" });
        }
        console.log("Publicación insertada correctamente en la base de datos");
        return res.json({ message: "Publicación guardada en la base de datos" });
    });
});

app.get('/publicaciones', (req, res) => {
    const sql = "SELECT p.*, u.nombre AS nombreUsuario, u.apellido AS apellidoUsuario, c.nombreCurso, c.codigoCurso, cat.nombre AS nombreCatedratico, cat.apellido AS apellidoCatedratico FROM publicaciones p INNER JOIN usuarios u ON p.registroAcademico = u.registroAcademico INNER JOIN cursos c ON p.codigoCurso = c.codigoCurso INNER JOIN catedraticos cat ON p.idCatedratico = cat.idCatedratico";
    
    db.query(sql, (err, data) => {
        if(err) {
            console.log("Error al ejecutar la consulta SQL:", err);
            return res.status(500).json({ error: "Error al recuperar las publicaciones de la base de datos" });
        }
        console.log('Publicaciones obtenidas de la base de datos:', data);
        
        return res.json(data);
    });
});

app.get('/usuario/:registroAcademico', (req, res) => {
    const registroAcademico = req.params.registroAcademico;
    const sql = "SELECT * FROM usuarios WHERE registroAcademico = ?";

    db.query(sql, [registroAcademico], (err, data) => {
        if (err) {
            console.log("Error al ejecutar la consulta SQL:", err);
            return res.status(500).json({ error: "Error al recuperar los datos del usuario" });
        }
        console.log('Datos del usuario obtenidos de la base de datos:', data);

        if (data.length > 0) {
            return res.json(data[0]);
        } else {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
    });
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});