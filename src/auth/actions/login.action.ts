import { apiTeslo } from "@/api/api.teslo"
import type { AuthResponse } from "../types/auth.response"

export const loginAction = async (email:string, password:string)=>{

    try{

        const {data} = await apiTeslo.post<AuthResponse>("/auth/login",{
            email,
            password
        }); 

        console.log(data);

        return data;
        
    }catch(error){
        console.error(error);
        throw new Error("An error ocurred while making the authetication")
    }


}