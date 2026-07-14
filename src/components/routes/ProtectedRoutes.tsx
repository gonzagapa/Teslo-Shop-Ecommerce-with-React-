import { useAuthStore } from "@/auth/auth.store";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";


export const AdminRoute = ({children}:PropsWithChildren)=>{
    const {authStatus, isAdmin} = useAuthStore()

    if(authStatus == "checking") return null; 

    else if(authStatus == "not-authenticated") return <Navigate to={"/auth/login"}/>

    if(!isAdmin()) return <Navigate to={"/"}/>

    return children;
}

export const AutheticatedRoute = ({children}:PropsWithChildren)=>{

    const authStatus = useAuthStore((state) => state.authStatus)

    if(authStatus == "checking") return null; 

    else if(authStatus == "authenticated") return <Navigate to={"/"}/>

    return children;
}