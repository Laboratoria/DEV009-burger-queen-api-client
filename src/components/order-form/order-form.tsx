import React from 'react';
import { useState } from 'react';
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
    onRemoveProduct: (product: Product) => void;
  }


  const OrderForm: React.FC<OrderFormProps> = ({ client, products, selectedProducts, onRemoveProduct  }) => {
    const orderTotal = selectedProducts.reduce((total, product) => total + product.price, 0);
    const [table, setTable] = useState("1");
    // const navigate = useNavigate();
    // const sendOrder = () => {
    //     // Aquí vamos a agregar la funcion para mandar la orden a la vista del cocinero
    //     navigate('/vistadelcocinero');
    // };

    return (
        <>
            <form className="formfororder">
                <h2>Your order for {client}</h2>
                <label htmlFor="table">Table:</label>
                <select
                    id="table"
                    className="inputfororder"
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                >
                    <option value="1">Table 1</option>
                    <option value="2">Table 2</option>
                    <option value="3">Table 3</option>
                    <option value="4">Table 4</option>
                    <option value="5">Table 5</option>
                </select>

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
                                        className="btn btn-danger"
                                        onClick={() => onRemoveProduct(product)}
                                    >
                                        <i className="fa fa-times"></i>
                                    </button>

                                </td>
                                {/* boton para mandar la orden a la vista del cocinero */}
                                {/* <td>
                                    <button
                                    className="btn btn-sendorder"
                                    onClick={sendOrder}
                                    >
                                        Send Order
                                    </button>
                                </td> */}
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
