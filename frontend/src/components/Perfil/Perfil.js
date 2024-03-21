import React from 'react';
import styles from './Perfil.module.css';

function Perfil({ usuario }) {
    return (
        <div className={styles.profileContainer}>
            <h2>Perfil del Usuario</h2>
            <p>Nombre: {usuario.nombre}</p>
            <p>Apellido: {usuario.apellido}</p>
            <p>Registro Académico: {usuario.registroAcademico}</p>
            <p>Correo: {usuario.correo}</p>
        </div>
    );
}

export default Perfil;
