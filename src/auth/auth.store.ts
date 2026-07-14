// store.ts
import type { User } from '@/types/user.interface'
import { create } from 'zustand'
import { loginAction } from './actions/login.action'

type AuthStatus = 'authenticated' | 'checking' | 'not-authenticated'

// Define types for state & actions
interface AuthState {
  //properties
  user:User|null,
  token: string | null
  authStatus:AuthStatus,
  //Getters

  //Actions
  login:(email:string, password:string)=>Promise<boolean>
  logout: ()=>void
}

// Create store using the curried form of `create`
export const useAuthStore = create<AuthState>()((set) => ({
  user:null,
  token:null,
  authStatus: 'checking',
  logout: ()=>{
     set({user:null, token:null})
  },
  login:async (email:string, password:string)=>{
    try{
      const data = await loginAction(email, password); 
      localStorage.setItem("token", data.token)

      set({user:data.user, token:data.token})
      return true;
    }catch(error){
      set({user:null, token:null})
      localStorage.removeItem("token");

      return false;
    }
  }
}))