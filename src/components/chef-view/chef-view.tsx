import { useEffect, useState } from 'react';
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
  client: string;
  products: { product: Product, qty: number }[];
  id: number;
}

interface ChefViewProps {
  ID: number;
  Name: string;
  Status: string;
}

const ChefView: React.FC<ChefViewProps> = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Orders[]>([]);
  const [, setAuthenticated] = useState(false);
  const [orderStates, setOrderStates] = useState<{ [key: number]: string }>({});

  const handleStatusChange = (order: Orders, status: string) => {
    // Cambiar el estado de la orden en el estado local
    setOrderStates({ ...orderStates, [order.id]: status });

    // Realizar una petición PATCH para actualizar el estado en la API
    const updateOrderStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/orders/2`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + localStorage.getItem("accessToken")
          },
          body: JSON.stringify({ status }) // Envía el nuevo estado a la API
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Puedes manejar la respuesta de la API si es necesario
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    };

    updateOrderStatus();
  };

  const handleBackClick = () => {
    navigate("/");
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
        const initialOrderStates: { [key: number]: string } = {};
        data.forEach((orders:any) => {
          initialOrderStates[orders.id] = 'inProgress';
        });
        setOrderStates(initialOrderStates);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    peticionGet();
  }, []);

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
                <button onClick={() => handleStatusChange(order, 'ready')}>Ready</button>
                <button onClick={() => handleStatusChange(order, 'inProgress')}>In Progress</button>
                <div>Status: {orderStates[order.id]}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChefView;
