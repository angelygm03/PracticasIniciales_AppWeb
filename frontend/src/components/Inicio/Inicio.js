import styles from './Inicio.module.css';
import React,{useState} from "react";
import { useNavigate} from 'react-router-dom';

function Inicio(){
    const nav = useNavigate
    const handleAcpAlert =()=>{
        nav('./login');
    }
    return (
        <body class={styles.appwrapper}>
            <div class={styles.botonperfil}>
                <button>Ver Perfil</button>
            </div>
            <div className={styles.imagencontainer}>
                <img src='../assets/logouazul.jpg' alt="LogoUsac" className={styles.imagen}/>
            </div>
            <div class={styles.buscador}>
                <span class={styles.buscador.lupa}>&#128269;</span>
                <input type="text" placeholder="Buscar Usuario"></input>
                <button>Buscar</button>
            </div>
            <textarea
            className={styles.textar}
            value='Name User'
            readOnly 
            />
            <div class={styles.contenedor}>
                <div class={styles.botonpubli}>
                    <button>Crear Publicacion</button>
                </div>
                <div class={styles.cuadrado}></div>
                <label class={styles.label}>Publicaciones</label>
                <div class={styles.listafiltros}>
                    <h3>Filtros</h3>
                        <ul>
                            <li><input type="radio" id="filtro1" name= "filtro"></input><label for="filtro1">Fecha de Creacion</label></li>
                            <li><input type="radio" id="filtro1" name= "filtro"></input><label for="filtro1">Filtrar por Curso</label></li>
                            <li><input type="radio" id="filtro2" name= "filtro"></input><label for="filtro2">Filtrar por Catedratico</label></li>
                            <li><input type="radio" id="filtro3" name= "filtro"></input><label for="filtro3">Filtro por Nombre de Curso</label></li>
                            <li><input type="radio" id="filtro3" name= "filtro"></input><label for="filtro3">Filtrar Por Nombre de Catedratico</label></li>
                        </ul>
                </div>
            </div>
        </body>
    );
}

export default Inicio;