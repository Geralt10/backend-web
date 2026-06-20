import React, { useState } from 'react'
import "../style/form.scss"
import {Link,useNavigate} from "react-router-dom"
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {handleRegister,loading}=useAuth();

    const navigate=useNavigate()

    if(loading){
      return(
        <main><h1>loading....</h1></main>
      )
    }
    async function handleFormSubmit(e) {
      e.preventDefault();
      try {
        await handleRegister(username,email,password);
        console.log("registered successfully");
        setUsername("")
        setEmail("")
        setPassword("")
        navigate("/login")
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }

  return (
    <div>
       <main>
       <div className="form-container">
           <h1>Register</h1>
           <form onSubmit={handleFormSubmit}>
             <input
             value={username}
              onChange={(e)=>setUsername(e.target.value)}
             type="text" name='username' placeholder='enter the username' autoComplete='username'/>
             <input
             value={email}
              onChange={(e)=>setEmail(e.target.value)}
             type="email" name='email' placeholder='enter the email' autoComplete='email'/>
             <input
             value={password}
              onChange={(e)=>setPassword(e.target.value)}
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
