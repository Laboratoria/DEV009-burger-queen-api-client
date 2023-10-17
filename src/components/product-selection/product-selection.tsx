import 'bootstrap/dist/css/bootstrap.min.css';
import './product-selection.css';
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  type: string;
  image: string; // Agregado: se espera una URL de imagen
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const breakfastProducts = products.filter((product) => product.type === 'Breakfast');
  const lunchProducts = products.filter((product) => product.type === 'Lunch');

  return (
    <div>
      <table className="table custom-table">
        <tbody>
          {breakfastProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>
                <img
                  className="product-image" // Nueva clase para las imágenes
                  src={product.image}
                  alt={product.name}
                />
              </td>
              <td>${product.price}</td>
            </tr>
          ))}
          {lunchProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>
                <img
                  className="product-image" // Nueva clase para las imágenes
                  src={product.image}
                  alt={product.name}
                />
              </td>
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
