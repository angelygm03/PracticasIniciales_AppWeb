import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Perfil.module.css';

function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const registroAcademico = localStorage.getItem('registroAcademico');
        if (registroAcademico) {
            axios.get(`http://localhost:8000/usuario/${registroAcademico}`)
                .then(response => {
                    console.log('Datos del usuario obtenidos:', response.data);
                    setUsuario(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error al obtener los datos del usuario:', error);
                    setLoading(false);
                });
        }
    }, []);

    return (
        <div>
            <h2 className={styles.title}>Perfil del Usuario</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : usuario ? (
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.cardBody}>
                            <h3 className={styles.cardTitle}>{`${usuario.nombre} ${usuario.apellido}`}</h3>
                            <p className={styles.cardText}>Registro Académico: {usuario.registroAcademico}</p>
                            <p className={styles.cardText}>Correo Electrónico: {usuario.correo}</p>
                            <p className={styles.cardText}>Contraseña: {usuario.password}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No se pudo cargar la información del usuario.</p>
            )}
            <div className={styles.buttonContainer}>
                <Link to="/inicio" className={`${styles.button} ${styles.buttonAceptar}`}>Aceptar</Link>
            </div>
        </div>
    );
}

export default Perfil;
