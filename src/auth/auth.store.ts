// store.ts
import type { User } from '@/types/user.interface'
import { create } from 'zustand'
import { loginAction } from './actions/login.action'
import { checkAuthAction } from './actions/check-auth.action'
import { registerAction } from './actions/register.action'

type AuthStatus = 'authenticated' | 'checking' | 'not-authenticated'

// Define types for state & actions
interface AuthState {
  //properties
  user:User|null,
  token: string | null
  authStatus:AuthStatus,
  //Getters
  isAdmin: ()=>boolean,

  //Actions
  login:(email:string, password:string)=>Promise<boolean>,
  register:(email:string, password:string, fullName:string) => Promise<boolean>,
  logout: ()=>void,
  checkStatus:()=>Promise<boolean>

}

// Create store using the curried form of `create`
export const useAuthStore = create<AuthState>()((set,get) => ({
  user:null,
  token:null,
  authStatus: 'checking',
  logout: ()=>{
     set({user:null, token:null,authStatus:'not-authenticated'}); 
    localStorage.removeItem("token");
  },
  login:async (email:string, password:string)=>{
    try{
      const data = await loginAction(email, password); 
      localStorage.setItem("token", data.token)

      set({user:data.user, token:data.token, authStatus:'authenticated'})
      return true;
    }catch(error){
      set({user:null, token:null, authStatus:'not-authenticated'})
      localStorage.removeItem("token");

      return false;
    }
  },

  isAdmin: ()=>{
    const roles = get().user?.roles ?? []
    return roles.includes('admin')
  },

  register:async (email:string, password:string, fullName:string)=>{
    try{
      const {user,token} = await registerAction({fullName:fullName,email,password});
      set({user, token, authStatus:'authenticated'});
      localStorage.setItem('token',token)
      return true;
    }catch(error){
      set({user:null, token:null,authStatus:'not-authenticated'}); 
      localStorage.removeItem('token')
      return false;
    }
 
  },

  checkStatus: async ()=>{

    try{
      const {token, user} = await checkAuthAction(); 
      set({user:user, token:token, authStatus:'authenticated'})
      return true

    }catch(error){
      set({user:null, token:null, authStatus:'not-authenticated'})
      return false;
    }

  }
}))