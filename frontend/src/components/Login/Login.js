import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();

    const handleIngresar = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'enctype': 'multipart/form-data',
            },
            body: formData
        })
        const data = await response.json();

        if (response.status !== 200) {
            alert(data.error);
            return;
        }

    }


    return (
        <div className={styles.formContainer}>
            <h2 className={styles.topText}>Universidad de San Carlos de Guatemala</h2>
            <h3 className={styles.topText}>Facultad de Ingeniería</h3>
            <h4 className={styles.subtitle}>-Inicio de Sesión-</h4>
            <form onSubmit={handleIngresar} encType="multipart/form-data">
                <div>
                    <label htmlFor="registroAcademico" className={styles.label}>Registro Académico:</label>
                    <input type="text" id="registroAcademico" name="registroAcademico" placeholder="2000123456" />
                </div>
                <div>
                    <label htmlFor="password" className={styles.label}>Contraseña:</label>
                    <input type="password" id="password" name="password" placeholder="*****" />
                </div>
                
                <div>
                <Link to="/inicial" className={`${styles.botonRegistro} boton-ingresar`}>Ingresar</Link>
                </div>
                <div>
                <Link to="/registro" className={`${styles.botonRegistro} boton-registro`}> Registrarse </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;