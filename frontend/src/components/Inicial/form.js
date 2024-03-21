import React,{useState} from "react";
import styles from './Inicial.module.css';

const Form = ({cursos, pub, setPub}) => {
    const [mostrarLista1, setMostrarLista1] = useState(false);
  const [mostrarLista2, setMostrarLista2] = useState(false);

  const handleChange =e =>{
    setPub({
        ...pub,
        [e.target.name]: e.target.value
    })
  }

  const handleLista =(event)=>{
    if(mostrarLista2){
        setPub({
            ...pub,
            ['Tipo']:'Curso',
            ['Nombre']: event.target.value
        })
    } else {
        setPub({
            ...pub,
            ['Tipo']:'Catedratico',
            ['Nombre']: event.target.value
        })
    }
  }

  let{mensaje, Tipo, Nombre}= pub

  const handleMostrarLista = (lista) => {
    if (lista === 'lista1') {
      setMostrarLista1(true);
      setMostrarLista2(false);
    } else if (lista === 'lista2') {
      setMostrarLista1(false);
      setMostrarLista2(true);
    }
  }

  const handleSubmit = () => {
    //validar datos
    if(mensaje===''|| Tipo==='' || Nombre===''){
        alert('Todos los campos son obligatorios')
        return
    }
    // consulta
    const requestInit={
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(pub)
    }
    fetch('http://localhost:9000/api/addpub', requestInit)
    .then(res => res.json())
    .then(res=> console.log(res))

    setPub({
        usuario_registroAcademico: 2022023,
        mensaje:'',
        Tipo:'',
        Nombre:''
    })
  }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <ul>
                    <li><input type="radio" id="curso" name= "tipop" onChange={() => handleMostrarLista('lista2')}></input><label for="curso">Curso</label></li>
                    <li><input type="radio" id="catedratico" name= "tipop" onChange={() => handleMostrarLista('lista1')}></input><label for="catedratico">Catedratico</label></li>
                </ul>
            </div>
            <div>
                {mostrarLista1 && (<select onChange={handleLista}>
                    {cursos.map((curso, index) => (
                        <option key={index} value={curso.catedratico}>{curso.catedratico}</option>
                    ))}
                </select>)}
            </div>
            <div>
                {mostrarLista2 &&(<select onChange={handleLista}>
                    {cursos.map((curso, index) => (
                        <option key={index} value={curso.nombreCurso}>{curso.nombreCurso}</option>
                    ))}
                </select>)}
            </div>
            <div>
                <label>Mensaje</label>
                <textarea name="mensaje" className={styles.textar2} onChange={handleChange}/>
            </div>
            <button type="submit" >Crear Publicacion</button>
        </form>
    );
}

export default Form;