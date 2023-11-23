import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "../components/login-view/log-in-view";
import WaiterView from "../components/waiter-view/waiter-view";
import Menu from "../components/menu/menu";
import OrderReady from "../components/order-ready-view/order-ready-view";
import ChefView from "../components/chef-view/chef-view";
import AdmiView from "../components/admi-view/admi-view";
import Staff from "../components/Staff/staff";
import MenuAdmi from "../components/admi-products/admi-products";


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/waiter-view" element={<WaiterView />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order-ready-view" element={<OrderReady />} />
        <Route path="/chef-view" element={<ChefView  />} />
        <Route path="/Admi-view" element={<AdmiView />} />
        <Route path="/Staff" element={<Staff />} />
        <Route path="/admi-products" element={< MenuAdmi />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;





