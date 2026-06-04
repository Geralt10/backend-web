import React, { useState } from 'react'
import "../style/form.scss"
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from '../hooks/useAuth'



const Login = () => {
  const [username,setUsername]=useState("")
      const [email,setEmail]=useState("")
      const [password,setPassword]=useState("")
      const{handleLogin,loading,user}=useAuth();
      
      const navigate=useNavigate()

      if(loading){
        return(
          <h1>Loading...</h1>
        )
      }

      async function handleFormSubmit(e) {
        e.preventDefault();

       await handleLogin(username,password)
        .then(()=>{
          console.log("logged in")
          navigate("/")
        })
        setUsername("")
        setPassword("")
      }
  return (
    <main>
       <div className="form-container">
           <h1>Login</h1>
           <form onSubmit={handleFormSubmit}>
             <input 
             value={username}
             onInput={(e)=>setUsername(e.target.value)}
             type="text" name='username' placeholder='enter the username' autoComplete='username'/>
             <input
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             type="password" name='password' placeholder='enter the password' autoComplete='password'/>
             <button>login</button>
           </form>
           <p>Already have an account? <Link className='toggleAuthFrom' to="/Register">Register</Link></p>
       </div>
    </main>
  )
}

export default Login
