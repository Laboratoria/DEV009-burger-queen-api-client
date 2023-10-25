import { useState, useEffect } from "react"; //useeffect realizar ciertas acciones en tu componente funcional (efectos secundarios)
import { useNavigate } from 'react-router-dom';
import OrderForm from "../order-form/order-form";
import UserProfile from "../user-profile/userprofile";
import ProductTable from "../product-selection/product-selection";
import "./menu.css";

interface Product { //typescript lo pide para definir product
  id: number;
  name: string;
  price: number;
  type: string;
  image: string;
}

const Menu = () => {
  const [client] = useState(""); //crea un estado con variable client y una funcion setclient para actualizar su estado
  const [products, setProducts] = useState<Product[]>([]); //crea un estado con variable products y una funcion setproducts para actualizar su estado
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);//se usa para botón logout y que cierre sesión con credenciales para tener que hacer login otra vez
  const [selectedProductType, setSelectedProductType] = useState<"Breakfast" | "Lunch">("Breakfast"); //revisa el cambio de estado para la selección de menú
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]); //revisa el cambio de estado por el estado de los productos seleccionados

  useEffect(() => { //promesa
    fetch("http://localhost:8080/products", { /*llama a la api mock y llamando a los productos*/
      method: "GET", //método para traer productos
      headers: {
        "Content-Type": "application/json",
        'Accept-Encoding': 'gzip, deflate, br',//cabecera http para mejorar el rendimiento y es para comprención de contenido 
        authorization: "Bearer " + localStorage.getItem("accessToken") //beares nombre de esquema de autenticación, obtenemos el token
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

  const handleProductSelect = (product: Product) => { //crea una nueva lista que contiene todos los elementos de prevSelectedProducts y luego agrega un nuevo elemento product al final de la lista.
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

