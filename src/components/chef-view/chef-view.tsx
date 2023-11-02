import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from '../user-profile/userprofile';
import { useNavigate } from 'react-router-dom';

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

const ChefView: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Orders[]>([]);
  const [, setAuthenticated] = useState(false);
  const [orderStates, setOrderStates] = useState<{ [key: number]: string }>({});

  const handleStatusChange = (order: Orders, status: string) => {
    // Cambiar el estado de la orden en el estado local
    setOrderStates({ ...orderStates, [order.id]: status });
    localStorage.setItem(`orderState_${order.id}`, status);

    // Obtén el índice de la orden actual en el estado de las órdenes
    const orderIndex = orders.findIndex((o) => o.id === order.id);

    // Calcula el tiempo transcurrido para la orden actual
    if (orderIndex !== -1) {
      const currentDate = new Date();
      const dateProcessed = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

      // Actualiza la orden con la nueva fecha procesada
      const updatedOrders = [...orders];
      updatedOrders[orderIndex] = { ...order, status, dateProcessed };
      setOrders(updatedOrders);

      // Realizar una petición PATCH para actualizar el estado en la API
      updateOrderStatus(order.id, status, dateProcessed);
    }
  };

  const updateOrderStatus = async (orderId: number, status: string, dateProcessed: string) => {
    try {
      const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({ status, dateProcessed }),
      });

      if (!response.ok) {
        throw Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleLogoutClick = () => {
    setAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    const peticionGet = async () => {
      try {
        const response = await fetch('http://localhost:8080/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });

        if (!response.ok) {
          throw Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        localStorage.setItem('orders', JSON.stringify(data));

        // Inicializar los estados de las órdenes
        const initialOrderStates: { [key: number]: string } = {};
        data.forEach((order: any) => {
          const savedState = localStorage.getItem(`orderState_${order.id}`);
          initialOrderStates[order.id] = savedState || 'inProgress';

          // Verifica si la fecha de entrada está presente y es válida
          if (order.dateEntry) {
            const entryDate = new Date(order.dateEntry);
            // Guarda la fecha de entrada en el estado local
            localStorage.setItem(`entryDate_${order.id}`, entryDate.toString());
          }
        });
        setOrderStates(initialOrderStates);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    peticionGet();
  }, []);

  const calculateTimeTaken = (order: Orders) => {
    if (order.dateProcessed && order.dateEntry) {
      const dateProcessed = new Date(order.dateProcessed);
      const entryDate = new Date(localStorage.getItem(`entryDate_${order.id}`));

      // Convertimos las fechas a milisegundos
      const timeDifferenceInMilliseconds = dateProcessed.getTime() - entryDate.getTime();

      // Convierte el tiempo en milisegundos a minutos
      const timeInMinutes = timeDifferenceInMilliseconds / (1000 * 60);

      if (timeInMinutes >= 60) {
        // Si el tiempo es de 60 minutos o más, muestra en horas
        const timeInHours = timeInMinutes / 60;
        return `${timeInHours.toFixed(2)} hours`;
      }

      return `${timeInMinutes.toFixed(2)} minutes`;
    }
    return 'N/A';
  };

  return (
    <div>
      <UserProfile
        profileType="cook"
        waiterName=""
        onBackClick={handleBackClick}
        showBackButton={false}
        onLogoutClick={handleLogoutClick}
        administratorName=""
        cookName=""
      />
      <table className="table product-cook">
        <thead>
          <tr>
            <th>ID</th>
            <th>Products</th>
            <th>Status</th>
            <th>Lead Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {order.products && order.products.map((item, index) => (
                  <div key={index}>
                    {item.product.name} - Qty: {item.qty}
                  </div>
                ))}
              </td>
              <td>
                <button
                  className="button-ready"
                  onClick={() => handleStatusChange(order, 'ready')}
                  disabled={orderStates[order.id] === 'ready'}
                >
                  Ready
                </button>
                <button
                  onClick={() => handleStatusChange(order, 'inProgress')}
                  disabled={orderStates[order.id] === 'ready'}
                >
                  In Progress
                </button>
                <div>Status: {orderStates[order.id]}</div>
              </td>
              <td>{calculateTimeTaken(order)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChefView;