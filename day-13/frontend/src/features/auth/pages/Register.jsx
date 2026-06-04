import React, { useState } from 'react'
import "../style/form.scss"
import {Link,useNavigate} from "react-router"
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {handleRegister,loading}=useAuth();

    const navigate=useNavigate()

    if(loading){
      return(
        <h1>loading....</h1>
      )
    }
    async function handleFormSubmit(e) {
      e.preventDefault();
      await handleRegister(username,email,password)
      .then(()=>{
        navigate("/login")
      })
      setUsername("")
      setEmail("")
      setPassword("")
    }

  return (
    <div>
       <main>
       <div className="form-container">
           <h1>Register</h1>
           <form onSubmit={handleFormSubmit}>
             <input
             value={username}
              onInput={(e)=>setUsername(e.target.value)}
             type="text" name='username' placeholder='enter the username' autoComplete='username'/>
             <input
             value={email}
              onInput={(e)=>setEmail(e.target.value)}
             type="email" name='email' placeholder='enter the email' autoComplete='email'/>
             <input
             value={password}
              onInput={(e)=>setPassword(e.target.value)}
             type="password" name='password' placeholder='enter the password' autoComplete='password'/>
             <button>Register</button>
           </form>
           <p>Already have an account? <Link className='toggleAuthFrom' to="/login">login</Link></p>
       </div>
    </main>
    </div>
  )
}

export default Register
