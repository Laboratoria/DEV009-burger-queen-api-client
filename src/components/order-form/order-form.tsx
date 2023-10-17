import React from 'react';
import './order-form.css'; // Asegúrate de tener un archivo CSS asociado
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Product {
    id: number;
    name: string;
    price: number;
    type: string;
}

interface OrderFormProps {
    client: string;
    products: Product[];
    selectedProducts: Product[];
    onRemoveProduct: (product: Product) => void; // Función para eliminar un producto seleccionado
}

const OrderForm: React.FC<OrderFormProps> = ({ client, products, selectedProducts, onRemoveProduct }) => {
    const handleRemoveProduct = (product: Product) => {
        onRemoveProduct(product); // Llamada a la función prop proporcionada
    };

    const orderTotal = selectedProducts.reduce((total, product) => total + product.price, 0);

    return (
        <>
            <form className="formfororder">
                <h2>Your order for {client}</h2>
                <label htmlFor="table">Table:</label>
                <input type="number" id="table" className="inputfororder" />

                <h3>Selected Products:</h3>
                <table className="choose">
                    <thead></thead>
                    <tbody>
                        {selectedProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>
                                    <button
                                        className="btn"
                                        onClick={() => handleRemoveProduct(product)}
                                    >
                                        <i className="fa fa-times"></i>
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="total">Total: ${orderTotal}</p>
            </form>
        </>
    );
};

export default OrderForm;
