function validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.name === ""){
        error.name = "Please enter your name"
    }
    else {
        error.name = ""
    }
    if(values.email === ""){
        error.email = "Please enter your email"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "enter your email properly"
    } else {
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Please enter your password"
    }
    else if(!password_pattern.test(values.password)){
        error.password = `
            Your password should be of 8 characters
            Your password should contain atleast one alphabet character
            Your password should contain atleast one numeric character
            Your password should contain atleast one small character
        `
    }
    else {
        error.password = ""
    }
    return error;
}

export default validation;