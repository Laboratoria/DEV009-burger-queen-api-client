import 'bootstrap/dist/css/bootstrap.min.css';
import './product-selection.css'
import { useState } from "react";


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
      {/* Breakfast and lunch table */}
      <table className="table custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {breakfastProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
        <tbody>
          {lunchProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;