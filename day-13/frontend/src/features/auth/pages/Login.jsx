import React, { useState } from 'react'
import "../style/form.scss"
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from '../hooks/useAuth'



const Login = () => {
  const [username,setUsername]=useState("")
      const [password,setPassword]=useState("")
      const{handleLogin,loading}=useAuth();
      
      const navigate=useNavigate()

      if(loading){
        return(
          <main><h1>loading....</h1></main>
        )
      }

      async function handleFormSubmit(e) {
        e.preventDefault();

       try {
         await handleLogin(username,password);
         console.log("logged in")
         setUsername("")
         setPassword("")
         navigate("/")
       } catch (error) {
         console.error("Login failed:", error);
       }
      }
  return (
    <main>
       <div className="form-container">
           <h1>Login</h1>
           <form onSubmit={handleFormSubmit}>
             <input 
             value={username}
             onChange={(e)=>setUsername(e.target.value)}
             type="text" name='username' placeholder='enter the username' autoComplete='username'/>
             <input
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             type="password" name='password' placeholder='enter the password' autoComplete='password'/>
             <button>login</button>
           </form>
           <p>Need an account? <Link className='toggleAuthFrom' to="/register">Register</Link></p>
       </div>
    </main>
  )
}

export default Login
