import  { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserProfile from "../user-profile/userprofile";
import ProductTableAdmi from "../Product-table-admi/Product-table-admi";
import "./admi-products.css"



const MenuAdmi = () => {
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);



  const handleBackClick = () => {
    navigate("/admi-view");
  };

  const handleLogoutClick = () => {
    setAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="outer-container">
      <div className="menu-view">
        <UserProfile
          profileType="administrator"
          waiterName=""
          onBackClick={handleBackClick}
          onLogoutClick={handleLogoutClick}
          administratorName=""
          cookName=""
          showBackButton={true}
        />
        <div className="admi-view-product">
          <ProductTableAdmi />
        </div>
      </div>
    </div>
  );
};

export default MenuAdmi;