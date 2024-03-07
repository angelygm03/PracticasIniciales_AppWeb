import styles from './Inicio.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Inicio() {
    const [cursos, setCursos] = useState([]);

    return (
        <div className={styles.formContainer}>
        <h2 className={styles.topText}>Universidad de San Carlos de Guatemala</h2>
        <h3 className={styles.topText}>Facultad de Ingeniería</h3>
        <h4 className={styles.subtitle}>-Cursos Primer Semestre 2024-</h4>
       </div>     
    );
}
export default Inicio;


