import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import OrderForm from "../order-form/order-form";
import ProductList from "../product-list/product-list";
import UserProfile from "../user-profile/userprofile";
import MainMenuButtons from "../main-menu.buttons/main-menu-buttons";

const Menu = ({ }) => {
      const [client, setClient] = useState("Kvn");
      const [products, setProducts] = useState([]);
      const navigate = useNavigate();
      const [, setAuthenticated] = useState(false);
    
        useEffect(() =>{
            fetch("http://localhost:8080/products", {  headers: {
                "Content-Type": "application/json",
                authorization:"Bearer "+localStorage.getItem("accessToken")
              },} )
              .then (response=> response.json())
                .then((response) => {
                    setProducts(response);
                })
        }, [])
      const handleBackClick = () => {
        navigate(-1);
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
          <div>
            <ProductList editable={false} products={products} />
          </div>
          <div>
            Creating order:
            <OrderForm client={client} />
          </div>
        </>
      );
    };

export default Menu;
