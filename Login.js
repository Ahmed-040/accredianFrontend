import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';



function Login() {   
    const [values, setValues] = useState({  
              email: '',
              password: ''
                })   
 const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    // const [backendError, setBackendError] = useState([])
    const handleInput = (event) => { 
         setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))   
   }  
 const handleSubmit =(event) => {    
        event.preventDefault(); 
        const err = Validation(values);
        setErrors(err);        
        if(err.email === "" && err.password === "") { 
            axios.post('http://localhost:8081/login', values).then(res => {
                     
                    if(res.data === "Success") { 
                    navigate('/home');       
                    } else { 
                     alert("No record existed"); 
                     }               
                     }).catch(err => console.log(err));        } 
       }
       return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                 <h2>Login</h2>
                <form action onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter your email' className='form-control rounded-0' name='email' onChange={handleInput}></input>
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter your password' className='form-control rounded-0' name='password' onChange={handleInput}></input>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>
                    <button type="submit" className='btn btn-success w-100'><strong>Log in</strong></button>
                    <p>you are abt to login</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light'>Sign Up</Link>
                </form>
            </div>
        </div>
    )
}
export default Login

