import styles from './Registro.module.css';
import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupValidation from './RegistroValidation';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Registro() {
    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        registroAcademico: '',
        password: '',
        correo: ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (Object.values(errors).every(error => error === "")) {
            axios.post('http://localhost:8000/registro', values)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    }, [errors, values]);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(SignupValidation(values));
        if(errors.nombre === "" && errors.apellido === "" && errors.registroAcademico === "" && errors.password === "" && errors.correo === "") {
            axios.post('http://localhost:8000/registro', values)
            .then(res => {
                navigate('/login'); 
            })
            .catch(err => console.log(err));
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.topText}>Universidad de San Carlos de Guatemala</h2>
            <h3 className={styles.topText}>Facultad de Ingeniería</h3>
            <h4 className={styles.subtitle}>-Registro-</h4>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre" className={styles.label}>*Nombre:</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Ingrese su nombre" 
                    onChange={handleInput} className='form-control' />
                    {errors.nombre && <span className='text-danger'>{errors.nombre}</span>}
                </div>
                <div>
                    <label htmlFor="apellido" className={styles.label}>*Apellido:</label>
                    <input type="text" id="apellido" name="apellido" placeholder="Ingrese su apellido" 
                    onChange={handleInput} className='form-control' />
                    {errors.apellido && <span className='text-danger'>{errors.apellido}</span>}
                </div>
                <div>
                    <label htmlFor="registroAcademico" className={styles.label}>*Registro Académico:</label>
                    <input type="text" id="registroAcademico" name="registroAcademico" placeholder="123456789" 
                    onChange={handleInput} className='form-control' />
                    {errors.registroAcademico && <span className='text-danger'>{errors.registroAcademico}</span>}
                </div>
                <div>
                    <label htmlFor="password" className={styles.label}>*Contraseña:</label>
                    <input type="password" id="password" name="password" placeholder="***********" 
                    onChange={handleInput} className='form-control' />
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <div>
                    <label htmlFor="correo" className={styles.label}>*Correo Electrónico:</label>
                    <input type="email" id="correo" name="correo" placeholder="email@correo.com" 
                    onChange={handleInput} className='form-control' />
                    {errors.correo && <span className='text-danger'>{errors.correo}</span>}
                </div>
                <p className={styles.bottomText}>* Campos obligatorios</p>
                <div>
                <button type="button" className={styles.botonRegistro}>
                Registrarse
                </button>
                </div>
            </form>
        </div>
    );
}

export default Registro;
