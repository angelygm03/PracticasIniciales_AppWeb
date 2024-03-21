import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Inicio.module.css';
import Post from '../Post/Post.js';

function Inicio() {
    const nav = useNavigate();
    const [registroAcademico, setRegistroAcademico] = useState('');
    const [publicaciones, setPublicaciones] = useState([]);
    const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8000/publicaciones')
            .then(response => {
                console.log('Publicaciones obtenidas:', response.data);
                setPublicaciones(response.data);
                setPublicacionesFiltradas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las publicaciones:', error);
            });
    }, []);

    const handleFiltroChange = (event) => {
        const filtro = event.target.value;
        setFiltroSeleccionado(filtro);

        switch (filtro) {
            case "curso":
                ordenarPublicaciones((a, b) => {
                    if (a.curso && b.curso) {
                        return a.curso.localeCompare(b.curso);
                    } else {
                        return 0;
                    }
                });
                break;
            case "nombreCurso":
                ordenarPublicaciones((a, b) => {
                    if (a.nombreCurso && b.nombreCurso) {
                        return a.nombreCurso.localeCompare(b.nombreCurso);
                    } else {
                        return 0;
                    }
                });
                break;
            case "nombreCatedratico":
                ordenarPublicaciones((a, b) => {
                    if (a.nombreCatedratico && b.nombreCatedratico) {
                        return a.nombreCatedratico.localeCompare(b.nombreCatedratico);
                    } else {
                        return 0;
                    }
                });
                break;
            default:
                break;
        }
    };

    const ordenarPublicaciones = (comparador) => {
        const publicacionesOrdenadas = [...publicacionesFiltradas].sort(comparador);
        setPublicacionesFiltradas(publicacionesOrdenadas);
    };

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
        <div class={styles.buscador}>
            <span class={styles.buscador.lupa}></span>
            <input type="text" placeholder="Buscar Usuario 🔍"></input>
        </div>
        <div className={styles.contenedor}>
          <div className={styles.botonpubli}>
            <Link to="/publicaciones">
              <button>Crear Publicación</button>
            </Link>
          </div>
          <label className={styles.label}>Publicaciones</label>
          <div className={styles.listafiltros}>
            <h3>Filtros</h3>
            <select className={styles.filtroContainer} value={filtroSeleccionado} onChange={handleFiltroChange}>
                <option value="">Seleccionar filtro</option>
                <option value="nombreCurso">Filtro por Curso</option>
                <option value="nombreCatedratico">Filtrar Por Catedrático</option>
            </select>
            </div>
            <div className={styles.contenedorPublicaciones}>
                {publicacionesFiltradas.map(publicacion => (
                    <Post key={publicacion.id} publicacion={publicacion} />
                ))}
            </div>
        </div>
    </body>
  );
}

export default Inicio;
