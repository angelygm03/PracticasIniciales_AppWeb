const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

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

app.listen(8000, () => {
    console.log("Server running on port 8000");
});