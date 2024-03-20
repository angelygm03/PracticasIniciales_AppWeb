function validation(values) {
    alert("")
    let error = {}
    const registroAcademico_pattern = /^\d+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (values.registroAcademico === "") {
        error.registroAcademico = "Por favor, llena este campo"
    }
    else if (!registroAcademico_pattern.test(values.registroAcademico)) {
        error.registroAcademico = "Registro académico no encontrado"
    } else {
        error.registroAcademico = ""
    }

    if(values.passwor === "") {
        error.password = "Por favor, llena este campo"
    }
    else if (!password_pattern.test(values.password)) {
        error.password = "Contraseña incorrecta"
    } else {
        error.password = ""
    }
    return error;
}

export default validation;