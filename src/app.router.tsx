import { createBrowserRouter } from "react-router";
import { ShopLayout } from "./shop/layout/ShopLayout";
import { HomePage } from "./shop/page/home/HomePage";
import { GenderPage } from "./shop/page/gender/GenderPage";
import { ProductPage } from "./shop/page/product/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShopLayout/>,
    children:[
        {
            index:true, 
            element:<HomePage/>
        }, 
        {
            path:"gender/:gender", 
            element:<GenderPage/>
        }, 
        {
            path:"product/:id",
            element:<ProductPage/>
        }
    ]
  },
]);