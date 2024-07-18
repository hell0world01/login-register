import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './loginValidation';
import axios from "axios"

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = e => {
        setValues(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = e => {
        e.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
            if(errors.email === "" && errors.password === ""){
                axios.post("http://127.0.0.1:1111/login", values)
                .then(res => {
                    if(res.data === "Success"){
                        navigate("/home");
                    }
                    else{
                        alert("No such record was found.")
                    }
                })
                .catch(err => console.log(err));
            }
    }
    useEffect(() => {
        console.log("Validation errors: ",errors);
    },[errors])
  return (
    <div className='flex justify-center items-center bg-slate-300 h-screen'>
        <div className='bg-white p-3 rounded w-96' >
        <h2 className='text-center font-semibold text-2xl'>Sign in</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                        Email
                    </label>
                    <input onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" type='email' name='email' placeholder='Enter your email' id='email' />
                    {errors.email && <span className='text-red-600'>{errors.email}</span> }
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                        Password
                    </label>
                    <input onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" type='password' name='password' placeholder='Enter your password' id='password'/>
                    {errors.password && <span className='text-red-600'>{errors.password}</span> }
                </div>
                <button type='submit' className='text-white w-full bg-emerald-600 py-2 px-4 rounded'>Log in</button>
                <p>You are agree to our terms and policies</p>
                <Link to="./signup" className='text-white w-full bg-blue-300 py-2 px-4 rounded block text-center'>Create Account</Link>
            </form>
        </div>
    </div>
  )
}

export default Login