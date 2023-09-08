import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layout/admin";
import LoginLayout from "./layout/login";
import UsuarioPage from "./pages/admin/usuarios";
import ProductosPage from "./pages/admin/productos";
import OrdenarPages from "./pages/mesero/ordenar";
import ServirPages from "./pages/mesero/servir";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginLayout/>
    },
    {
        path: '/chef',
        element: <ChefLayout/>
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
            {
                path: '/admin/ordenar',
                element: <OrdenarPages/>
            },
            {
                path: '/admin/servir',
                element: <ServirPages/>
            },
        ]
    },
])