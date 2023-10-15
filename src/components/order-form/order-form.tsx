import React, { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    type: string;
}

const OrderForm = ({ client, products }: { client: string; products: Product[] }) => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const handleProductSelect = (product: Product) => {
        setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product]);
    };

    const handleRemoveProduct = (product: Product) => {
        setSelectedProducts((prevSelectedProducts) => prevSelectedProducts.filter((p) => p.id !== product.id));
    };

    const orderTotal = selectedProducts.reduce((total, product) => total + product.price, 0);

    return (
        <>
            <form>
                <h2>Your order for {client}</h2>
                <label htmlFor="table">Table:</label>
                <input type="number" id="table" />

                <h3>Selected Products:</h3>
                <ul>
                    {selectedProducts.map((product) => (
                        <li key={product.id}>
                            {product.name} - ${product.price}{' '}
                            <button onClick={() => handleRemoveProduct(product)}>Remove</button>
                        </li>
                    ))}
                </ul>

                <p>Total: ${orderTotal}</p>
            </form>
        </>
    );
};

export default OrderForm;
