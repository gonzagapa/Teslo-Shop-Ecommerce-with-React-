import { Outlet } from "react-router";
import { CustomHeader } from "../components/CustomHeader";
import { Footer } from "../components/Footer";

export function ShopLayout() {
  return (
    <div className="min-h-screen bg-background">
      <CustomHeader/>

      <Outlet/>

       <Footer/>
    </div>
  )
}
