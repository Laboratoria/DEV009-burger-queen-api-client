import { useState, useEffect } from "react";
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
  image: string;
}

export interface SelectedProduct {
  qty: number;
  product: Product;
}

const Menu = () => {
  const [id] = useState("");
  const [client] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState<"Breakfast" | "Lunch">("Breakfast");
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const updateProductQty = (productId: number, newQty: number) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((selectedProduct) => {
        if (selectedProduct.product.id === productId) {
          return { ...selectedProduct, qty: newQty };
        }
        return selectedProduct;
      })
    );
  };

  const handleProductSelect = (product: Product) => {
    console.log("Product selected:", product);
  
    setSelectedProducts((prevSelectedProducts) => {
      console.log("Previous selected products:", prevSelectedProducts);
  
      const productIndex = prevSelectedProducts.findIndex(
        (selectedProduct) => selectedProduct.product.id === product.id
      );
      console.log("Product index:", productIndex);
  
      if (productIndex !== -1) {
        // El producto ya está en la lista, aumenta su cantidad
        const updatedSelectedProducts = [...prevSelectedProducts];
        updatedSelectedProducts[productIndex].qty += 1;
        console.log("Updated selected products:", updatedSelectedProducts);
        return updatedSelectedProducts;
      } else {
        // El producto no está en la lista, agrégalo con cantidad 1
        return [
          ...prevSelectedProducts,
          { product, qty: 1 }
        ];
      }
    });
  };
  

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

  const handleRemoveProduct = (product: Product) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((p) => p.product.id !== product.id)
    );
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
          showBackButton={true}
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
              products={products?.filter((product) => product.type === selectedProductType)}
              onProductSelect={handleProductSelect}
            />
          </div>
          <div>
            Creating order:
            <OrderForm
              id={id}
              client={client}
              selectedProducts={selectedProducts}
              onRemoveProduct={handleRemoveProduct}
              updateProductQty={updateProductQty}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
