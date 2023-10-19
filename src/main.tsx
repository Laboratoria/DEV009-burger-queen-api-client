import '../src/index.css';
import AppRoutes from "./route/routes";
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <AppRoutes />
)