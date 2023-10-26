import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import UserProfile from "../user-profile/userprofile";
import "./order-ready-view.css"



const OrderReady = () => {
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false); //necesitas autenticar para ingresar otra vez

  const handleBackClick = () => {
    navigate("/waiter-view");
  };
  const handleLogoutClick = () => {
    setAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <UserProfile
        profileType="waiter"
        waiterName=""
        onBackClick={handleBackClick}
        onLogoutClick={handleLogoutClick} administratorName={""} cookName={""} />
        <div className="order-ready-container">
      
      </div>
    </>
  );
};

export default OrderReady;