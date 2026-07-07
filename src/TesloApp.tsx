import { RouterProvider } from "react-router"
import { router } from "./app.router"

function TesloApp() {

  return (
    <RouterProvider router={router}/>
  )
}

export default TesloApp
