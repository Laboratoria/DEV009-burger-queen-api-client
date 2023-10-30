import React from 'react';
import { useState } from 'react';
import './order-form.css';
import { Order } from '../chef-view/chef-view';
import { SelectedProduct } from '../menu/menu';

interface Product {
    id: number;
    name: string;
    price: number;
    type: string;
    image: string;
}

interface OrderFormProps {
    id: string;
    client: string;
    selectedProducts: SelectedProduct[];
    onRemoveProduct: (product: Product) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ client, selectedProducts, onRemoveProduct }) => {
    const orderTotal = selectedProducts?.reduce((total, product) => total + product.product.price, 0) || 0;
    const [table, setTable] = useState("1");

    const peticionPost = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/orders", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                      authorization: "Bearer " + localStorage.getItem("accessToken")
                },
                body: JSON.stringify({
                    client: client,
                    products: selectedProducts
                  
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

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
                    <option value="1"> 1</option>
                    <option value="2"> 2</option>
                    <option value="3"> 3</option>
                    <option value="4"> 4</option>
                    <option value="5"> 5</option>
                </select>

                <h3>Selected Products:</h3>
                <table className="choose">
                    <thead></thead>
                    <tbody>
                        {selectedProducts?.map((product) => (
                            <tr key={product.product.id}>
                                <td>{product.product.name}</td>
                                <td>${product.product.price}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => onRemoveProduct(product.product)}
                                    >
                                        <i className="fa fa-times"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button
                    className="btn btn-sendorder"
                    onClick={peticionPost}
                >
                    Send Order
                </button>

                <p className="total">Total: ${orderTotal}</p>
            </form>
        </>
    );
};

export default OrderForm;

