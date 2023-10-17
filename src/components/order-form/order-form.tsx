import React, { useState } from 'react';

// interface Product {
//     id: number;
//     name: string;
//     price: number;
//     type: string;
// }

interface OrderFormProps {
    client: string;
    products: Product[];
    selectedProducts: Product[];
  }

  const OrderForm: React.FC<OrderFormProps> = ({ client, products, selectedProducts }) => {
    const handleRemoveProduct = (product: Product) => {
        // falta lógica para eliminar 
    };

    const orderTotal = selectedProducts.reduce((total, product) => total + product.price, 0);


    return (
        <>
            <form>
                <h2>Your order for {client}</h2>
                <label htmlFor="table">Table:</label>
                <input type="number" id="table" />

                <h3>Selected Products:</h3>
                <table className="table">
                    <thead>
                    </thead>
                    <tbody>
                        {selectedProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveProduct(product)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p>Total: ${orderTotal}</p>
            </form>
        </>
    );
};

export default OrderForm;
