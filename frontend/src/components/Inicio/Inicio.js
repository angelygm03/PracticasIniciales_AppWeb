import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Inicio.module.css';
import Post from '../Post/Post.js';

function Inicio() {
    const nav = useNavigate();
    const [registroAcademico, setRegistroAcademico] = useState('');
    const [publicaciones, setPublicaciones] = useState([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState("");

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

    useEffect(() => {
        axios.get('http://localhost:8000/publicaciones')
            .then(response => {
                console.log('Publicaciones obtenidas:', response.data);
                setPublicaciones(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las publicaciones:', error);
            });
    }, []);

    const handleFiltroChange = (event) => {
        const filtro = event.target.value;
        setFiltroSeleccionado(filtro);
        switch (filtro) {
            case "fechaCreacion":
                ordenarPorFechaCreacion();
                break;
            case "curso":
                ordenarPorCurso();
                break;
            case "nombreCurso":
                ordenarPorNombreCurso();
                break;
            case "nombreCatedratico":
                ordenarPorNombreCatedratico();
                break;
            default:
                break;
        }
    };

    const ordenarPorFechaCreacion = () => {
        const publicacionesOrdenadas = [...publicaciones].sort((a, b) => {
            return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
        });
        setPublicaciones(publicacionesOrdenadas);
    };

    const ordenarPorCurso = () => {
        const publicacionesOrdenadas = [...publicaciones].sort((a, b) => {
            return a.curso.localeCompare(b.curso);
        });
        setPublicaciones(publicacionesOrdenadas);
    };

    const ordenarPorNombreCurso = () => {
        const publicacionesOrdenadas = [...publicaciones].sort((a, b) => {
            return a.nombreCurso.localeCompare(b.nombreCurso);
        });
        setPublicaciones(publicacionesOrdenadas);
    };

    const ordenarPorNombreCatedratico = () => {
      const publicacionesOrdenadas = [...publicaciones].sort((a, b) => {
          if (a.catedratico && b.catedratico) {
              return a.catedratico.localeCompare(b.catedratico);
          } else {
              return 0;
          }
      });
      setPublicaciones(publicacionesOrdenadas);
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
                <option value="fechaCreacion">Filtrar por Fecha de Creación</option>
                <option value="curso">Filtrar por Curso</option>
                <option value="catedratico">Filtrar por Catedrático</option>
                <option value="nombreCurso">Filtro por Nombre de Curso</option>
                <option value="nombreCatedratico">Filtrar Por Nombre de Catedrático</option>
            </select>
            </div>
            <div className={styles.contenedorPublicaciones}>
                {publicaciones.map(publicacion => (
                    <Post key={publicacion.id} publicacion={publicacion} />
                ))}
            </div>
        </div>
    </body>
  );
}

export default Inicio;
