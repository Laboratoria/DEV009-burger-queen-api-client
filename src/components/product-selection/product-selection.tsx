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
  selectedProducts?: Product[];
  onProductSelect: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, selectedProducts, onProductSelect  }) => {
  const handleProductSelect = (product: Product) => {
    onProductSelect(product);
};

  return (
    <div>
        <table className="table custom-table">
            <thead>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        <td>{product.name}</td>
                        <td>
                          <img className='product-image'
                          src={product.image}
                          alt={product.name}
                          />
                        </td>
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
