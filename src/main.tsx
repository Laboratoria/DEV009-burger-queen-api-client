import App from "./route/routes"; //es la aplicación que nos ayuda a renderizar y traducir el código de react
import { createRoot } from 'react-dom/client'; //createRoot se usa para crear un punto de inicio en el DOM

createRoot(document.getElementById('root')).render(
  <App />
)