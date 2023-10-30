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

export interface Order {
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [, setAuthenticated] = useState(false);

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
        console.log(data)
        setOrders(data);
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
                <select className='productStateR'>
                  <option value="Pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="Ready">Ready</option>
                </select>
              </td>
            
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default ChefView;






