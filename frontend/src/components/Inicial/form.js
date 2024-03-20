import React,{useState} from "react";
import styles from './Inicio.module.css';

const Form = () => {

    return(
        <form>
            <div>
                <ul>
                    <li><input type="radio" id="curso" name= "tipop"></input><label for="curso">Curso</label></li>
                    <li><input type="radio" id="catedratico" name= "tipop"></input><label for="catedratico">Catedratico</label></li>
                </ul>
            </div>
            <div>
                <label>Mensaje</label>
                <textarea className={styles.textar2}/>
            </div>
            <button >Crear Publicacion</button>
        </form>
    );
}

export default Form;