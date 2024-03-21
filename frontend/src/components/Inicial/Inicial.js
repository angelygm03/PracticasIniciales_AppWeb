
import styles from './Inicial.module.css';
import React,{useState,useEffect} from "react";
import { useNavigate} from 'react-router-dom';
import Form from './form'
import Publis from './publis'




function Inicial(){
    const [creacion, setCreacion] = useState(false);
    const [curso, setCurso] = useState(false);
    const [catedratico, setCatedratico]= useState(false);
    const [nombreCurso,setNombreCurso] = useState(false);
    const [nombreCat,setNombreCat]= useState(false);

    const[pub, setPub] = useState({
        usuario_registroAcademico: 2022023,
        mensaje:'',
        Tipo:'',
        Nombre:''
    })
    
    const[pubs, setPubs] = useState([])
    const [cursos, setCursos] = useState([])

    useEffect(() => {
        const getcursos = () => {
            fetch('http://localhost:9000/api/cursos')
            .then(res => res.json())
            .then(res=> setCursos(res))
          }
          getcursos()
    }, [])

    useEffect(() => {
        const getpubs = () => {
            fetch('http://localhost:9000/api/verpubs')
            .then(res => res.json())
            .then(res=> setPubs(res))
        }
        getpubs()
        const listaAlReves = pubs.reverse();
    }, [])
    

    const handlefiltros = (filtro) => {
        if (filtro === 'creacion') {
            setCreacion(true);
            setCurso(false);
            setCatedratico(false);
            setNombreCurso(false);
            setNombreCat(false);
        } else if (filtro === 'curso') {
            setCreacion(false);
            setCurso(true);
            setCatedratico(false);
            setNombreCurso(false);
            setNombreCat(false);
        }else if (filtro === 'catedratico') {
            setCreacion(false);
            setCurso(false);
            setCatedratico(true);
            setNombreCurso(false);
            setNombreCat(false);
        }else if (filtro === 'nombrecurso') {
            setCreacion(false);
            setCurso(false);
            setCatedratico(false);
            setNombreCurso(true);
            setNombreCat(false);
        }else if (filtro === 'nombrecatedratico') {
            setCreacion(false);
            setCurso(false);
            setCatedratico(false);
            setNombreCurso(false);
            setNombreCat(true);
        }
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
                <div class={styles.cuadrado}>
                <Publis pubs={pubs} creacion={creacion} curso={curso} catedratico={catedratico} nombreCurso={nombreCurso} nombreCat={nombreCat}/>
                </div>

                <label class={styles.label}>Publicaciones</label>
                <div class={styles.listafiltros}>
                    <h3>Filtros</h3>
                        <ul>
                            <li><input type="radio" id="filtro1" name= "filtro" onChange={() => handlefiltros('creacion')}></input><label for="filtro1">Fecha de Creacion</label></li>
                            <li><input type="radio" id="filtro1" name= "filtro" onChange={() => handlefiltros('curso')}></input><label for="filtro1">Filtrar por Curso</label></li>
                            <li><input type="radio" id="filtro2" name= "filtro" onChange={() => handlefiltros('catedratico')}></input><label for="filtro2">Filtrar por Catedratico</label></li>
                            <li><input type="radio" id="filtro3" name= "filtro" onChange={() => handlefiltros('nombrecurso')}></input><label for="filtro3">Filtro por Nombre de Curso</label></li>
                            <li><input type="radio" id="filtro3" name= "filtro" onChange={() => handlefiltros('nombrecatedratico')}></input><label for="filtro3">Filtrar Por Nombre de Catedratico</label></li>
                        </ul>
                </div>
            </div>

            <div className={styles.divisionderecha}>
                <h5 style={{textAlign: 'center'}}>Crear Publicacion</h5>
                <Form cursos={cursos} pub={pub} setPub={setPub}/>
            </div>
        </body>
    );
}

export default Inicial;