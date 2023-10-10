import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "../components/log in-view/log-in-view";
import WaiterView from "../components/waiter-view/waiter-view"; // Asegúrate de importar el componente correcto

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/waiter-view" element={<WaiterView />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;





