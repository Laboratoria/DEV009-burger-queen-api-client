import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "../components/log in-view/log-in-view";
import WaiterView from "../components/waiter-view/waiter-view"; // Asegúrate de importar el componente correcto
import Menu from "../components/menu/menu";
import OrderReady from "../components/order-ready-view/order-ready-view";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/waiter-view" element={<WaiterView />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order-ready-view" element={<OrderReady />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;





