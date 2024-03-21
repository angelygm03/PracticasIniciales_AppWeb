import styles from './Password.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Password() {
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const navigate = useNavigate();
    const camposObligatorios = ['registroAcademico', 'correo'];

    const handlePassword = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const camposIncompletos = camposObligatorios.filter((campo) => !formData.get(campo));

        const registroAcademico = formData.get('registroAcademico');
        const correo = formData.get('correo');

        if (camposIncompletos.length > 0) {
            alert('Por favor, complete todos los campos obligatorios.');
        
        }
    }

    const handleAceptarAlerta = () => {
        setMostrarAlerta(false);
        navigate('/login');
    }
    return (
        <div className={styles.formContainer}>
            <h2 className={styles.topText}>Universidad de San Carlos de Guatemala</h2>
            <h3 className={styles.topText}>Facultad de Ingeniería</h3>
            <h4 className={styles.subtitle}>-Nueva Contraseña-</h4>
            <form onSubmit={handlePassword} encType="multipart/form-data">
                <div>
                    <label htmlFor="registroAcademico" className={styles.label}>Registro Académico:</label>
                    <input className={styles.inputField} type="text" id="registroAcademico" name="registroAcademico" placeholder="2000123456" />
                </div>
                <div>
                    <label htmlFor="correo" className={styles.label}>Correo:</label>
                    <input className={styles.inputCorreo} type="correo" id="correo" name="correo" placeholder="email@correo.com" />
                </div>
                <div>
                    <button type="submit" className={styles.botonAceptar}> Aceptar </button>
                </div>
            </form>
        </div>
    );
}

export default Password;