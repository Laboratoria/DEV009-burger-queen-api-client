import 'bootstrap/dist/css/bootstrap.min.css';
import './product-selection.css'


interface Product {
    id: number;
    name: string;
    price: number;
    type: string;
}

interface ProductTableProps {
    products: Product[];
}
  
  const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
    const breakfastProducts = products.filter((product) => product.type === 'Breakfast');
    const lunchProducts = products.filter((product) => product.type === 'Lunch');
    
    return (
      <div>
        {/* Breakfast table */}
        <table className="table custom-table">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {breakfastProducts.map((product, index)  => (
              <tr key={index}>
                <td className="text-left">{product.name}</td>
                <td className="text-left">${product.price}</td>
              </tr>
            ))}
          </tbody>
          <tbody>
            {lunchProducts.map((product, index) => (
              <tr key={index}>
                <td className="text-left">{product.name}</td>
                <td className="text-left">${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
    );
   };
  
  export default ProductTable;