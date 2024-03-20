import { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [registroAcademico, setRegistroAcademico] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8000/', { registroAcademico, password })
            .then(res => {
                console.log('Respuesta del servidor:', res.data);
                if (res.data === "Success") {
                    console.log("Inicio de sesión exitoso, redirigiendo al usuario...");
                    navigate('/inicio');
                } else {
                    console.log("Inicio de sesión fallido, mostrando mensaje de alerta al usuario...");
                    alert("No se encuentra registrado o los datos son incorrectos");
                }
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
            });
    }

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.topText}>Universidad de San Carlos de Guatemala</h2>
            <h3 className={styles.topText}>Facultad de Ingeniería</h3>
            <h4 className={styles.subtitle}>-Inicio de Sesión-</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="registroAcademico" className={styles.label}>Registro Académico:</label>
                    <input type="text" id="registroAcademico" name="registroAcademico" placeholder="2000123456" className='form-control'
                        value={registroAcademico}
                        onChange={event => setRegistroAcademico(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className={styles.label}>Contraseña:</label>
                    <input type="password" id="password" name="password" placeholder="*****" className='form-control'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className={styles.botonIngresar}> Ingresar </button>
                </div>
                <div>
                    <Link to="/password_reset" className={`${styles.botonPassword} boton-password`}>¿Olvidó su contraseña?</Link>
                </div>
                <div>
                    <Link to="/registro" className={`${styles.botonRegistro} boton-registro`}> Registrarse </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
