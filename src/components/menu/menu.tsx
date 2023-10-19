import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import OrderForm from "../order-form/order-form";
import UserProfile from "../user-profile/userprofile";
import ProductTable from "../product-selection/product-selection";
import "./menu.css";

interface Product {
  id: number;
  name: string;
  price: number;
  type: string;
}

interface MenuProps {
  products: Product[];
  selectedProducts: Product[];
}

const Menu = () => {
  const [client, setClient] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState<"Breakfast" | "Lunch">("Breakfast");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept-Encoding': 'gzip, deflate, br',
        authorization: "Bearer " + localStorage.getItem("accessToken")
      },
    })
      .then(response => response.json())
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleBackClick = () => {
    navigate("/waiter-view");
  };

  const handleLogoutClick = () => {
    setAuthenticated(false);
    navigate("/");
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product]);
  };

  const handleRemoveProduct = (product: Product) => {
    setSelectedProducts((prevSelectedProducts) => prevSelectedProducts.filter((p) => p.id !== product.id));
  };

  return (
    <div className="outer-container">
      <div className="menu-view">
      <UserProfile
        profileType="waiter"
        waiterName=""
        onBackClick={handleBackClick}
        onLogoutClick={handleLogoutClick}
        administratorName={""}
        cookName={""}
      />
      <div className="main-menu-buttons-container">
        <div className="food-buttons-container">
          <button
            className={`breakfast ${selectedProductType === "Breakfast" ? "active" : ""}`}
            onClick={() => setSelectedProductType("Breakfast")}
          >
            Breakfast
          </button>
          <button
            className={`lunch ${selectedProductType === "Lunch" ? "active" : ""}`}
            onClick={() => setSelectedProductType("Lunch")}
          >
            Lunch
          </button>
        </div>
        <div className="productsSelection">
          <ProductTable
            products={products.filter((product) => product.type === selectedProductType)}
            onProductSelect={handleProductSelect}
          />
        </div>
        <div>
          Creating order:
          <OrderForm client={client} products={products} selectedProducts={selectedProducts} onRemoveProduct={handleRemoveProduct}  />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Menu;

