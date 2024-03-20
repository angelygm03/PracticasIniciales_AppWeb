function SignupValidation(values) {
    alert("")
    let error = {}
    const nombre_pattern = /^[a-zA-Z\s']+$/
    const apellido_pattern = /^[a-zA-Z\s']+$/
    const registroAcademico_pattern = /^\d+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const correo_pattern =  /^[^\s@]+@[^\s@]+\.[^\s]+$/

    if (values.nombre === "") {
        error.nombre = "Por favor, llena este campo"
    }
    else {
        error.nombre = ""
    }

    if (values.apellido === "") {
        error.apellido = "Por favor, llena este campo"
    }
    else if (!apellido_pattern.test(values.apellido)) {
        error.apellido = "Registro académico no encontrado"
    } else {
        error.apellido = ""
    }

    if (values.registroAcademico === "") {
        error.registroAcademico = "Por favor, llena este campo"
    }
    else if (!registroAcademico_pattern.test(values.registroAcademico)) {
        error.registroAcademico = "Registro académico no encontrado"
    } else {
        error.registroAcademico = ""
    }

    if(values.password === "") {
        error.password = "Por favor, llena este campo"
    }
    else {
        error.password = ""
    }

    if(values.correo === "") {
        error.correo = "Por favor, llena este campo"
    }
    else if (!correo_pattern.test(values.correo)) {
        error.correo = "Contraseña incorrecta"
    } else {
        error.correo = ""
    }

    return error;
}

export default SignupValidation;