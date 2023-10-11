import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "../components/log in-view/log-in-view";
import WaiterView from "../components/waiter-view/waiter-view"; // Asegúrate de importar el componente correcto
// import order-ready-view from "./components/order-ready-view";
// import menu from "./components/menu";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/waiter-view" element={<WaiterView />} />
        {/* <Route path="/menu" component={menu} /> */}
        {/* <Route path="/order-ready-view" component={order-ready-view} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;





