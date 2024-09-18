import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Register() {
    const [user,setUser]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        role:""
    })
    const [registrationStatus,setRegistrationStatus]=useState(null);
    const handleChange=(e)=>{
        const {value,name}=e.target
        setUser({...user,[name]:value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response=await axios.post("http://localhost:3000/api/user/register",{...user})
        console.log(response)
        setUser({firstName:"",lastName:"",email:"",password:"",role:""})
        if(response.status===201 || response.data.message=="User created successfully"){
            setRegistrationStatus(true)
        }
        else{
            setRegistrationStatus(false)
        }
    }

  return (
    <>
    {registrationStatus ==null ? <h1>Register</h1>:
    registrationStatus ? <h1>Registration Successful</h1>:<h1>Registration Failed: Something went wrong</h1>
    }
    <form action="" onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder='firstName' value={user.firstName} onChange={handleChange}/>
        <input type="text" name="lastName" placeholder='lastName' value={user.lastName} onChange={handleChange}/>
        <input type="email" name="email" placeholder='email' value={user.email} onChange={handleChange}/>
        <input type="password" name="password" placeholder='password' value={user.password} onChange={handleChange}/>
        <input type="text" name="role" placeholder='role' value={user.role} onChange={handleChange}/>
        <button type='submit'>Register</button>

    </form>
    </>
  )
}

export default Register