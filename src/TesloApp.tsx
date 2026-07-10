import { RouterProvider } from "react-router"
import { router } from "./app.router"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function TesloApp() {

  return (
     <QueryClientProvider client={queryClient}>
       <RouterProvider router={router}/>
        <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
  )
}

export default TesloApp
