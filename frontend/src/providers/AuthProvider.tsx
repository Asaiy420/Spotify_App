import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import {axiosInstance} from "../lib/axios.js";
import { Loader } from "lucide-react";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {

    const updateApiToken = (token:string | null) => {
        if (token){
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`; // add token to axios instance
        } else {
            delete axiosInstance.defaults.headers.common['Authorization']; // remove token from axios instance
        }
    }

    const {getToken} = useAuth(); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);       
            } catch (error) {
                updateApiToken(null); // remove token from axios instance
                console.log("Error in AuthProvider", error);
            }finally{
                setLoading(false);
            }
        }
        initAuth(); 
    }, [getToken])

    if (loading) return (
        <div className = "h-screen w-full flex items-center justify-center">
            <Loader className = "size-8 text-emerald-500 animate-spin"/>
        </div>
        
    )
  return (
    <>{children}</>
  )
}

export default AuthProvider