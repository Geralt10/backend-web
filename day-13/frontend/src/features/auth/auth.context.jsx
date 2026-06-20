import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";


export const AuthContext = createContext();

export  function AuthProvider({children}){
    const[user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        async function bootstrapUser() {
            try {
                const response = await getMe();
                setUser(response.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        bootstrapUser();
    }, []);

    
    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
          {children}
        </AuthContext.Provider>
    )

}
