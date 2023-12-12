import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import Validation from './LoginValidation';
import axios from 'axios'
function Signup(){
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        cpassword:''
    })
    const navigate=useNavigate();
    const [errors,setErrors]=useState({})
    const handleInput=(event) =>{
        setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
    }
    const handleSubmit=(event) =>{
        event.preventDefault();
        console.log(values);
        // setErrors(Validation(values));
        const err = Validation(values);
        setErrors(err);
        if(errors.name==="" && errors.email==="" && errors.password==="" && errors.cpassword===""){
            axios.post('http://localhost:8081/signup',values)   
            .then(res =>{
             navigate('/signup')
            })
            .catch(err=>console.log(err));
        }
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-up</h2>
                <form action onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>UserName</strong></label>
                        <input type="text" placeholder='Enter your Name' name='name' onChange={handleInput} className='form-control rounded-0'></input>
                        {errors.name && <span className='text-danger'> {errors.name}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter your email' name='email' onChange={handleInput} className='form-control rounded-0'></input>
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter your password'name='password' onChange={handleInput} className='form-control rounded-0'></input>
                        {errors.cpassword && <span className='text-danger'> {errors.cpassword}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Confirm Password</strong></label>
                        <input type="password" placeholder='ReEnter password' name='cpassword' onChange={handleInput} className='form-control rounded-0'></input>
                        {errors.cpassword && <span className='text-danger'> {errors.cpassword}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'><strong>Sign Up</strong></button>
                    <p>you are abt to login</p>
                    <Link to="/" className='btn btn-default border w-100 bg-light'>Log in</Link>
                </form>
            </div>
        </div>
    )
}
export default Signup