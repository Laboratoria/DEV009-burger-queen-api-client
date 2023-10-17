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
  selectedProducts?: Product[];
  onProductSelect: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, selectedProducts, onProductSelect  }) => {
  const handleProductSelect = (product: Product) => {
    onProductSelect(product);
};
  // const breakfastProducts = products.filter((product) => product.type === 'Breakfast');
  // const lunchProducts = products.filter((product) => product.type === 'Lunch');


  return (
    <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>
                            <button onClick={() => handleProductSelect(product)}>Select</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default ProductTable;