import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layout/ShopLayout";
import { HomePage } from "./shop/page/home/HomePage";
import { GenderPage } from "./shop/page/gender/GenderPage";
import { ProductPage } from "./shop/page/product/ProductPage";
import { lazy } from "react";
import { LoginPage } from "./auth/pages/login/LoginPage";
import RegisterPage from "./auth/pages/register/RegisterPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import { AdminRoute, AutheticatedRoute } from "./components/routes/ProtectedRoutes";

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
    element:(
        <AutheticatedRoute>
            <AuthLayout/>
        </AutheticatedRoute>
), 
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
    element: (
        <AdminRoute>
            <AdminLayout/>
        </AdminRoute>
    ), 
    children:[
        {
            index:true, 
            Component:DashboardPage,
        },
        {
            path:'products/:idSlug',
            Component:AdminProductPage
        },
        {
            path:'products',
            Component:AdminProductsPage
        }
    ]
  },
  {
    path:'*',
    element:<Navigate to={'/'}/>
  }
]);