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
}

const OrderReady: React.FC = () => {
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [orderStates, setOrderStates] = useState<{ [key: number]: string }>({});

  const checkSolution = (order: Orders) => {
    const updatedStatus = order.status === 'Delivered' ? 'NO' : 'Delivered';
    order.status = updatedStatus;
    setOrders([...orders]);
  
    // Guardar el estado actual en el localStorage
    localStorage.setItem(`orderState_${order.id}`, updatedStatus); // Corrección aquí
  };
  

  const handleBackClick = () => {
    navigate('/waiter-view');
  };

  const handleLogoutClick = () => {
    setAuthenticated(false);
    navigate('/');
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
        setOrders(data);
        
        // Crear un objeto para mapear los estados de las órdenes por ID
        const orderStatesMap: { [key: number]: string } = {};
  
        // Actualizar el objeto orderStatesMap con los estados de las órdenes
        data.forEach((order: any) => {
          const savedState = localStorage.getItem(`orderState_${order.id}`);
          order.status = savedState || order.status; // Usar el estado del localStorage o el original
          orderStatesMap[order.id] = order.status;
          order.dateProcessed = order.dateProcessed;
        });
  
        // Actualizar el estado con el objeto orderStatesMap
        setOrderStates(orderStatesMap);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    peticionOrder();
  }, []);
  

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
                  <div>Status: {orderStates[order.id]}</div>
                </td>
                <td>
                  <p className="total">
                    ${order.products.reduce((subTotal, product) => subTotal + product.product.price * product.qty, 0)}
                  </p>
                </td>
                <td>
                  <button
                    className={order.status === 'Delivered' ? 'select-button delivered-button' : 'select-button'}
                    onClick={() => checkSolution(order)}
                  >
                    {order.status === 'Delivered' ? 'Delivered' : 'NO'}
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
