import { useState } from 'react';
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

const ChefView = () => {
  const [selectedProducts] = useState<Product[]>([]);
  console.log(selectedProducts)
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);

  const handleBackClick = () => {
    navigate("/");
  };
  const handleLogoutClick = () => {
    setAuthenticated(false);
    navigate("/");
  };


  return (


    <div>
      <UserProfile
        profileType="cook"
        waiterName=""
        onBackClick={handleBackClick}
        showBackButton={false}
        onLogoutClick={handleLogoutClick} administratorName={""} cookName={""} />
      <table className="table product-cook">
        <thead>
          <tr>
            <th>Tablita dejare ver</th>
            {/* Agrega más encabezados según tus necesidades */}
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td><select className='productStateR'>
                <option value="Pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="Ready">Ready</option>
                </select></td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
}

export default ChefView;




