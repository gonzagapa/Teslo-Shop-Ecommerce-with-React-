import { apiTeslo } from "@/api/api.teslo";
import type { AuthResponse } from "../types/auth.response";

export const checkAuthAction = async ():Promise<AuthResponse>=>{
    const token = localStorage.getItem("token");
    if(!token) {
        throw new Error("token wasnt found")
    }

    try{
        const {data} = await apiTeslo.get<AuthResponse>("/auth/check-status"); 
        localStorage.setItem("token",data.token);
        return data;
    }catch(error){
        localStorage.removeItem("token");
    }
    throw new Error("Tpken expired or not valid");
}