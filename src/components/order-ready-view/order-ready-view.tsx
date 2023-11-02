import React, { useState, useEffect } from 'react';
import UserProfile from '../user-profile/userprofile';
import { useNavigate } from 'react-router-dom';
import './order-ready-view.css';

interface Product {
  id: number;
  name: string;
  price: number;
  type: string;
  image: string;
}

interface Orders {
  dateEntry: string;
  table: number;
  client: string;
  products: { product: Product, qty: number }[];
  id: number;
  status: string;
  dateProcessed: string;
  delivered: boolean; 
}

const OrderReady: React.FC = () => {
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Orders[]>([]);

  const checkSolution = (order: Orders) => {
    const updatedDelivered = !order.delivered; 
    order.delivered = updatedDelivered; 
    setOrders([...orders]);

    // Guardar el estado actual en el localStorage
    localStorage.setItem(`orderDelivered_${order.id}`, updatedDelivered.toString());
  };
  
  useEffect(() => {
    const peticionOrder = async () => {
      try {
        const response = await fetch(`http://localhost:8080/orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        const ordersWithDeliveredFlag = data.map((order: { id: any; }) => ({
          ...order,
          delivered: localStorage.getItem(`orderDelivered_${order.id}`) === 'true'
        }));
        setOrders(ordersWithDeliveredFlag);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    peticionOrder();
  }, []);

  const handleBackClick = () => {
    navigate('/waiter-view');
  };

  const handleLogoutClick = () => {
    setAuthenticated(false);
    navigate('/');
  };

  return (
    <>
      <UserProfile
        profileType="waiter"
        waiterName=""
        onBackClick={handleBackClick}
        onLogoutClick={handleLogoutClick}
        administratorName={''}
        cookName={''}
        showBackButton={true}
      />
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
                  {order.products &&
                    order.products.map((item, index) => (
                      <div key={index}>
                        {item.product.name} - Qty: {item.qty}
                      </div>
                    ))}
                </td>
                <td>
                  <div>Status: {order.status}</div>
                </td>
                <td>
                  <p className="total">
                    ${order.products.reduce((subTotal, product) => subTotal + product.product.price * product.qty, 0)}
                  </p>
                </td>
                <td>
                  <button
                    className={order.delivered ? 'select-button delivered-button' : 'select-button'}
                    onClick={() => checkSolution(order)}
                  >
                    {order.delivered ? 'Delivered' : 'NO'}
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


