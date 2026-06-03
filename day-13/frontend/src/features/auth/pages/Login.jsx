import React, { useState } from 'react'
import "../style/form.scss"
import {Link} from "react-router"
import axios from 'axios'
const Login = () => {
  const [username,setUsername]=useState("")
      const [email,setEmail]=useState("")
      const [password,setPassword]=useState("")

      async function handleFormSubmit(e) {
        e.preventDefault();

        await axios.post("http://localhost:3000/api/auth/login",{
          username,
          password
        },{withCredentials:true})
        .then((res)=>{
          console.log(res.data);
          
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
             type="text" name='username' placeholder='enter the username' />
             <input
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             type="password" name='password' placeholder='enter the password' />
             <button>login</button>
           </form>
           <p>Already have an account? <Link className='toggleAuthFrom' to="/Register">Register</Link></p>
       </div>
    </main>
  )
}

export default Login
