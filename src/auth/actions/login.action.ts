import { apiTeslo } from "@/api/api.teslo"
import type { LoginResponse } from "../types/auth.response"

export const loginAction = async (email:string, password:string)=>{

    try{

        const {data} = await apiTeslo.post<LoginResponse>("/auth/login",{
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