import { apiTeslo } from "@/api/api.teslo"
import type { AuthResponse } from "../types/auth.response"

interface Props{
    fullName:string, 
    email:string,
    password:string
}

export const registerAction = async ({fullName,email,password}:Props)=>{

    try{
        const {data} = await apiTeslo.post<AuthResponse>('/auth/register',{
                fullName,
                email,
                password
        }); 
    
        return data;
    }catch(error){
        console.error(error)
        throw new Error('invalid value inputs');
    }
}