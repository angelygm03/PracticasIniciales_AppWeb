import styles from './Registro.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const navigate = useNavigate();
    const camposObligatorios = ['nombre', 'apellido', 'registroAcademico', 'password', 'correo'];

    const handleRegistro = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const camposIncompletos = camposObligatorios.filter((campo) => !formData.get(campo));

        const password = formData.get('password');
        if (password.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        if (camposIncompletos.length > 0) {
            alert('Por favor, complete todos los campos obligatorios.');
        } else {
            try {
                const response = await fetch('http://localhost:3000/registro', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Error al registrar el usuario');
                }

                console.log('Usuario registrado exitosamente');
                setMostrarAlerta(true);
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
                alert('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
            }
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
            <h4 className={styles.subtitle}>-Registro-</h4>
            <form onSubmit={handleRegistro} encType="multipart/form-data">
                <div>
                    <label htmlFor="nombre" className={styles.label}>*Nombre:</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Ingrese su nombre" />
                </div>
                <div>
                    <label htmlFor="apellido" className={styles.label}>*Apellido:</label>
                    <input type="text" id="apellido" name="apellido" placeholder="Ingrese su apellido" />
                </div>
                <div>
                    <label htmlFor="registroAcademico" className={styles.label}>*Registro Académico:</label>
                    <input type="text" id="registroAcademico" name="registroAcademico" placeholder="123456789" />
                </div>
                <div>
                    <label htmlFor="password" className={styles.label}>*Contraseña:</label>
                    <input type="password" id="password" name="password" placeholder="***********" />
                </div>
                <div>
                    <label htmlFor="correo" className={styles.label}>*Correo Electrónico:</label>
                    <input type="correo" id="correo" name="correo" placeholder="email@correo.com" />
                </div>
                <p className={styles.bottomText}>* Campos obligatorios</p>
                <div>
                    <button type="submit" className={styles.botonRegistro}> Aceptar </button>
                </div>
            </form>
                {mostrarAlerta && (
                <div className="alert alert-success">
                    Registro exitoso. Puedes iniciar sesión.
                    <button className={styles.btnAceptar} onClick={handleAceptarAlerta}>
                    Iniciar Sesión
                    </button>
                </div>
                )}
        </div>
      );
}

export default Registro;
