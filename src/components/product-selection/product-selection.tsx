import 'bootstrap/dist/css/bootstrap.min.css';
import './product-selection.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: number;
  name: string;
  price: number;
  type: string;
  image: string;
}

interface ProductTableProps {
  products: Product[];
  selectedProducts?: Product[];
  onProductSelect: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onProductSelect }) => {
  const handleProductSelect = (product: Product) => {
    onProductSelect(product);
  };

  return (
    <div>
      <table className="table custom-table " >
        <thead>
          {/* Encabezados de la tabla */}
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>
                <img
                  className='product-image'
                  src={product.image}
                  alt={product.name}
                />
              </td>
              <td>${product.price}</td>
              <td>
                <button className="select-button" onClick={() => handleProductSelect(product)}>
                  <FontAwesomeIcon icon={faCheck} className="check-icon" /> {/* fontawesome (es la libreria ) está conectado con css para poner el check */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
