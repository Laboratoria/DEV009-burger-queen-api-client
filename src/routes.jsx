import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layout/admin";
import LoginLayout from "./layout/login";
import { Children } from "react";
import UsuarioPage from "./pages/usuarios";
import ProductosPage from "./pages/productos";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginLayout/>
    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        children:[
            {
                path: '/admin/usuarios',
                element: <UsuarioPage/>
            },
            {
                path: '/admin/productos',
                element: <ProductosPage/>
            },
        ]
    },
])