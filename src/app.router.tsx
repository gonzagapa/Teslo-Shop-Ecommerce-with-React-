import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layout/ShopLayout";
import { HomePage } from "./shop/page/home/HomePage";
import { GenderPage } from "./shop/page/gender/GenderPage";
import { ProductPage } from "./shop/page/product/ProductPage";
import { lazy } from "react";
import { LoginPage } from "./auth/pages/login/LoginPage";
import RegisterPage from "./auth/pages/register/RegisterPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import ProductsPage from "./shop/page/products/ProductsPage";

const AuthLayout = lazy(() => import('./auth/layout/AuthLayout'))
const AdminLayout = lazy(()=> import('./admin/layout/AdminLayout'))

export const router = createBrowserRouter([

    //Shop Routes
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

  //Auth routes
  {
    path:'/auth', 
    Component:AuthLayout, 
    children:[
        {
            index:true,
            element:<Navigate to={'/auth/login'}/>
        },
        {
            path:'login', 
            Component:LoginPage
        }, 
        {
            path:'register',
            Component:RegisterPage
        }
    ]
  }, 

  //Admin routes
  {
    path:'/admin',
    Component: AdminLayout, 
    children:[
        {
            index:true, 
            Component:DashboardPage,
        },
        {
            path:'product/:idSlug',
            Component:ProductPage
        },
        {
            path:'products',
            Component:ProductsPage
        }
    ]
  },
  {
    path:'*',
    element:<Navigate to={'/'}/>
  }
]);