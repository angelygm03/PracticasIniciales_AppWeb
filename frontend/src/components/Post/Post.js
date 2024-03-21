import styles from './Post.module.css'; 
function Post({ publicacion }) {
    const formattedDateTime = new Date(publicacion.fecha).toLocaleString();

    return (
        <div className={styles.post}>
            <p>Fecha y Hora de Publicación: {formattedDateTime}</p>
            <p>Nombre del Usuario: {publicacion.nombreUsuario} {publicacion.apellidoUsuario}</p>
            <p>Código del Curso: {publicacion.codigoCurso}</p>
            <p>Nombre del Curso: {publicacion.nombreCurso}</p>
            <p>Nombre del Catedrático: {publicacion.nombreCatedratico} {publicacion.apellidoCatedratico}</p>
            <p>Comentario: {publicacion.comentario}</p>
        </div>
    );
}
export default Post;