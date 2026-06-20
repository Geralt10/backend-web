import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login,register,getMe } from "../services/auth.api.js";
export function useAuth(){
    const context = useContext(AuthContext);
    const {user,setUser,loading,setLoading}=context;

    const refreshUser = async()=>{
        setLoading(true)
        try {
            const response = await getMe();
            setUser(response.user);
            return response.user;
        } finally {
            setLoading(false)
        }
    }

     const handleLogin = async(username,password)=>{
            setLoading(true)
            try {
                const response =await login(username,password);
                setUser(response.user);
            } catch (error) {
                console.log(error);
                throw error
            }
            finally{
                  setLoading(false)
            }
        }

         const handleRegister = async(username,email,password)=>{
        setLoading(true)
        try {
            const response =await register(username,email,password);
            setUser(response.user);
        } catch (error) {
            console.log(error);
            
        }
        finally{
              setLoading(false)
        }
    }

    return{user,setUser,loading,setLoading,handleLogin,handleRegister,refreshUser}
}
