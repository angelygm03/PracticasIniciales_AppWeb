import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Publicaciones/Publicaciones.module.css';

function Publicaciones() {
    const [selectedCurso, setSelectedCurso] = useState('');
    const [selectedCatedratico, setSelectedCatedratico] = useState('');
    const [catedraticos, setCatedraticos] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [contenidoPublicacion, setContenidoPublicacion] = useState('');
    const [registroAcademico, setRegistroAcademico] = useState(''); // Utilizamos registroAcademico en lugar de usuario

    useEffect(() => {
        console.log('Fetching cursos...'); 
        axios.get('http://localhost:8000/cursos')
            .then(response => {
                console.log('Cursos recibidos:', response.data);
                setCursos(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los cursos:', error);
            });

        // obtener el regAca del usuario del almacenamiento local
        const storedRegistroAcademico = localStorage.getItem('registroAcademico');
        if (storedRegistroAcademico) {
            setRegistroAcademico(storedRegistroAcademico);
        }
    }, []);

    const handleCursoChange = (event) => {
        const codigoCurso = event.target.value;
        setSelectedCurso(codigoCurso);

        axios.get(`http://localhost:8000/catedraticos/${codigoCurso}`)
        .then(response => {
            console.log('Catedráticos recibidos:', response.data);
            setCatedraticos(response.data);
            setSelectedCatedratico('');
        })
        .catch(error => {
            console.error('Error al obtener los catedráticos:', error);
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const nuevaPublicacion = {
            registroAcademico: registroAcademico,
            codigoCurso: selectedCurso,
            idCatedratico: selectedCatedratico,
            comentario: contenidoPublicacion
        };

        axios.post('http://localhost:8000/publicaciones', nuevaPublicacion)
            .then(response => {
                console.log('Publicación creada exitosamente:', response.data);
                setSelectedCurso('');
                setSelectedCatedratico('');
                setContenidoPublicacion('');
            })
            .catch(error => {
                console.error('Error al crear la publicación:', error);
            });
    };

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <h2>Crear Publicación</h2>
                <form onSubmit={handleSubmit}>
                    <button onClick={handleSubmit} className={styles.closeButton}>
                        &times;
                    </button>
                    <div>
                        <label htmlFor="curso">Curso:</label>
                        <select id="curso" value={selectedCurso} onChange={handleCursoChange}>
                            <option value="">Selecciona un curso</option>
                            {cursos.map(curso => (
                                <option key={curso.codigoCurso} value={curso.codigoCurso}>{curso.codigoCurso} - {curso.nombreCurso}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="catedratico">Catedrático:</label>
                        <select id="catedratico" value={selectedCatedratico} onChange={(e) => setSelectedCatedratico(e.target.value)}>
                            <option value="">Selecciona un catedrático</option>
                            {catedraticos.map(catedratico => (
                                <option key={catedratico.idCatedratico} value={catedratico.idCatedratico}>{catedratico.nombreCompleto}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="contenido">Contenido de la publicación:</label>
                        <textarea id="contenido" value={contenidoPublicacion} onChange={(e) => setContenidoPublicacion(e.target.value)}></textarea>
                    </div>
                    <button type="submit">Crear</button>
                </form>
            </div>
        </div>
    );
}

export default Publicaciones;
