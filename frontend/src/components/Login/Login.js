import { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import validation from './LoginValidation';

function Login() {
    const [values, setValues] = useState({
        registroAcademico: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
    }
    return (
        <div className={styles.formContainer}>
            <h2 className={styles.topText}>Universidad de San Carlos de Guatemala</h2>
            <h3 className={styles.topText}>Facultad de Ingeniería</h3>
            <h4 className={styles.subtitle}>-Inicio de Sesión-</h4>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="registroAcademico" className={styles.label}>Registro Académico:</label>
                    <input type="text" id="registroAcademico" name="registroAcademico" placeholder="2000123456" 
                    onChange={handleInput} className='form-control' />
                    {errors.registroAcademico && <span className='text-danger'>{errors.registroAcademico}</span>}
                </div>
                <div>
                    <label htmlFor="password" className={styles.label}>Contraseña:</label>
                    <input type="password" id="password" name="password" placeholder="*****" 
                    onChange={handleInput} className='form-control' />
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
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