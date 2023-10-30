import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import UserProfile from "../user-profile/userprofile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// import "./order-ready-view.css"

interface Orders {
  table: number;
  client: string;
  products: { product: Product, qty: number }[];
  id: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  type: string;
  image: string;
}


const OrderReady = () => {
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [orderStates, setOrderStates] = useState<{ [key: number]: string }>({});
  const orderTotal = orders?.reduce((total, product) => total + product.products.price, 0) || 0;
  
  
  const checkSolution = () => {
    
  }

  const handleBackClick = () => {
    navigate("/waiter-view");
  };
  const handleLogoutClick = () => {
    setAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    const peticionGet = async () => {
      try {
        const response = await fetch("http://localhost:8080/orders", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + localStorage.getItem("accessToken")
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setOrders(data);

        // Inicializar los estados de las órdenes
        const readyOrders: { [key: number]: string } = {};
        data.forEach((orders: any) => {
          readyOrders[orders.id] = 'inProgress';
        });
        setOrderStates(readyOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    peticionGet();
  }, []);


  return (
    <>
      <UserProfile
        profileType="waiter"
        waiterName=""
        onBackClick={handleBackClick}
        onLogoutClick={handleLogoutClick} administratorName={""} cookName={""} showBackButton={true} />
      <div className="order-ready-container">
        <table className="table orderProductWaiter">
          <thead>
            <tr>
              <th>ID</th>
              <th>Table</th>
              <th>Client</th>
              <th>Products</th>
              <th>Status</th>
              <th>Total price</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.table}</td>
                <td>{order.client}</td>
                <td>
                  {order.products && order.products.map((item, index) => (
                    <div key={index}>
                      {item.product.name} - Qty: {item.qty}
                    </div>
                  ))}
                </td>
                <td>
                  <div>Status: {orderStates[order.id]}</div>
                </td>
                <td><p className="total">Total: ${orderTotal}</p></td>
                <td>
                  <button className="select-button" onClick={() =>  checkSolution (orders)}>  
                    <FontAwesomeIcon icon={faCheck} className="check-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderReady;