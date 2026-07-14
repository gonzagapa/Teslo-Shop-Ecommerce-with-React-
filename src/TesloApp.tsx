import { RouterProvider } from "react-router"
import { router } from "./app.router"
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { PropsWithChildren } from "react";
import { checkAuthAction } from "./auth/actions/check-auth.action";
import { FullScreenLoading } from "./components/custom/FullScreenLoading";

const queryClient = new QueryClient(); 

const AuthCheckProvider = ({children}:PropsWithChildren)=>{

  const {isLoading} = useQuery({
    queryKey:['auth'],
    queryFn: checkAuthAction, 
    refetchInterval:1000 * 60 * 1.5, 
    refetchOnWindowFocus:true
  })

  if(isLoading) return <FullScreenLoading />

  return children
}

function TesloApp() {

  return (
     <QueryClientProvider client={queryClient}>
      <AuthCheckProvider>
          <RouterProvider router={router}/>
        </AuthCheckProvider>
        <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
  )
}

export default TesloApp
