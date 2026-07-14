// store.ts
import type { User } from '@/types/user.interface'
import { create } from 'zustand'
import { loginAction } from './actions/login.action'
import { checkAuthAction } from './actions/check-auth.action'

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
  logout: ()=>void,
  checkStatus:()=>Promise<boolean>

}

// Create store using the curried form of `create`
export const useAuthStore = create<AuthState>()((set) => ({
  user:null,
  token:null,
  authStatus: 'checking',
  logout: ()=>{
     set({user:null, token:null,authStatus:'not-authenticated'})
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