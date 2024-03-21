import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Inicio.module.css';

function Inicio() {
    const nav = useNavigate();
    const [registroAcademico, setRegistroAcademico] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/registro')
            .then(response => {
                console.log('Registro académico obtenido:', response.data);
                setRegistroAcademico(response.data.registroAcademico);
            })
            .catch(error => {
                console.error('Error al obtener el registro académico del usuario:', error);
            });
    }, []);

    const verPerfil = () => {
      nav('/perfil');
  };

  return (
    <body className={styles.appwrapper}>
      <div className={styles.botonperfil}>
        <button onClick={verPerfil}>Ver Perfil</button>
      </div>
      <div className={styles.imagencontainer}>
        <img src='../assets/logouazul.jpg' alt="LogoUsac" className={styles.imagen}/>
      </div>
      <div className={styles.buscador}>
        <span className={styles.buscador.lupa}>&#128269;</span>
        <input type="text" placeholder="Buscar Usuario"></input>
        <button>Buscar</button>
      </div>
      <div className={styles.contenedor}>
        <div className={styles.botonpubli}>
          <Link to="/publicaciones">
            <button>Crear Publicación</button>
          </Link>
        </div>
        <div className={styles.cuadrado}></div>
        <label className={styles.label}>Publicaciones</label>
        <div className={styles.listafiltros}>
          <h3>Filtros</h3>
          <ul>
            <li><input type="radio" id="filtro1" name= "filtro"></input><label htmlFor="filtro1">Fecha de Creacion</label></li>
            <li><input type="radio" id="filtro1" name= "filtro"></input><label htmlFor="filtro1">Filtrar por Curso</label></li>
            <li><input type="radio" id="filtro2" name= "filtro"></input><label htmlFor="filtro2">Filtrar por Catedratico</label></li>
            <li><input type="radio" id="filtro3" name= "filtro"></input><label htmlFor="filtro3">Filtro por Nombre de Curso</label></li>
            <li><input type="radio" id="filtro3" name= "filtro"></input><label htmlFor="filtro3">Filtrar Por Nombre de Catedratico</label></li>
          </ul>
        </div>
      </div>
    </body>
  );
}

export default Inicio;
