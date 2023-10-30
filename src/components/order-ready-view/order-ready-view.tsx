import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import UserProfile from "../user-profile/userprofile";
// import "./order-ready-view.css"



const OrderReady = () => {
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);

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
        <button className="tablenumber">Table 1</button>
        <button className="tablenumber">Table 2</button>
        <button className="tablenumber">Table 3</button>
        <button className="tablenumber">Table 4</button>
        <button className="tablenumber">Table 5</button>
      </div>
    </>
  );
};

export default OrderReady;