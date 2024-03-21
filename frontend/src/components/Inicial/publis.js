import React,{useState} from "react";
import styles from './Inicial.module.css';

const Publis = ({pubs,creacion, curso, catedratico, nombreCurso, nombreCat}) => {
    return(
        <div>
        {creacion && (<div>
            {pubs.map(pub=>(
            <div class={styles.publis}>
                <div>
                    <label>Usuario</label>
                    <textarea class={styles.textarea} value={pub.usuario_registroAcademico} readOnly />
                </div>
                <div>
                    <label>Tipo de Publicacion</label>
                    <textarea  class={styles.textarea} value={pub.Tipo} readOnly />
                </div>
                    
                <div>  
                    {pub.Tipo==='curso'||pub.Tipo==='Curso' ? (
                        <div>
                        <label>Nombre del Curso</label>
                        <textarea  class={styles.textarea} value={pub.Nombre} readOnly />
                        </div>
                    ) : (
                        <div>
                        <label>Nombre del Catedratico</label>
                        <textarea  class={styles.textarea} value={pub.Nombre} readOnly />
                        </div>
                    )}
                </div>
                <div>
                    <label>Mensaje</label>
                    <textarea  class={styles.textarea} value={pub.mensaje} readOnly />
                </div>
                <div>
                    <label>Fecha Creacion</label>
                    <textarea  class={styles.textarea} value={pub.fecha_creacion} readOnly />
                </div>
            </div>
        ))}
        </div>)}
        {curso && (<div>
            {pubs.map(pub=>(    
                <div>  
                    {pub.Tipo==='curso'||pub.Tipo==='Curso' ? (
                        <div class={styles.publis}>
                        <div>
                        <label>Usuario</label>
                        <textarea class={styles.textarea} value={pub.usuario_registroAcademico} readOnly />
                        </div>
                        <div>
                            <label>Tipo de Publicacion</label>
                            <textarea  class={styles.textarea} value={pub.Tipo} readOnly />
                        </div>
                        <div>
                        <label>Nombre del Curso</label>
                        <textarea  class={styles.textarea} value={pub.Nombre} readOnly />
                        </div>
                        <div>
                            <label>Mensaje</label>
                            <textarea  class={styles.textarea} value={pub.mensaje} readOnly />
                        </div>
                        <div>
                            <label>Fecha Creacion</label>
                            <textarea  class={styles.textarea} value={pub.fecha_creacion} readOnly />
                        </div>
                    </div>
                    ):<div></div> 
                    }
                </div>
                
        ))}
        </div>)}
        {catedratico && (<div>
            {pubs.map(pub=>(    
                <div>  
                    {pub.Tipo==='Catedratico' ? (
                        <div class={styles.publis}>
                        <div>
                        <label>Usuario</label>
                        <textarea class={styles.textarea} value={pub.usuario_registroAcademico} readOnly />
                        </div>
                        <div>
                            <label>Tipo de Publicacion</label>
                            <textarea  class={styles.textarea} value={pub.Tipo} readOnly />
                        </div>
                        <div>
                        <label>Nombre del Catedratico</label>
                        <textarea  class={styles.textarea} value={pub.Nombre} readOnly />
                        </div>
                        <div>
                            <label>Mensaje</label>
                            <textarea  class={styles.textarea} value={pub.mensaje} readOnly />
                        </div>
                        <div>
                            <label>Fecha Creacion</label>
                            <textarea  class={styles.textarea} value={pub.fecha_creacion} readOnly />
                        </div>
                    </div>
                    ):<div></div> 
                    }
                </div>
                
        ))}
        </div>)}
        </div>
    );

}
export default Publis;