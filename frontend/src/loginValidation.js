function validation(values) {
    let errors = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    if(values.email === ""){
        errors.email = "Please enter your email"
    }
    else if(!email_pattern.test(values.email)){
        errors.email = "enter your email properly"
    } else {
        errors.email = ""
    }

    if(values.password === ""){
        errors.password = "Please enter your password"
    }
    else if(!password_pattern.test(values.password)){
        errors.password = `
            Your password should be of 8 characters
            Your password should contain atleast one alphabet character
            Your password should contain atleast one numeric character
            Your password should contain atleast one small character
        `
    }
    else {
        errors.password = ""
    }
    return errors;
}

export default validation;