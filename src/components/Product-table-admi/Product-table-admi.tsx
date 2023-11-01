import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditDeleteButtonsAdmi from '../Edit-delete-button-admi/Edit-Delete-button-admi';
import { Button, Modal, Form } from 'react-bootstrap';

interface Product {
    id: number;
    name: string;
    price: string;
    type: string;
    image: string;
}

interface ProductTableProps {
    onAddProductAdmi: (product: Product) => void;
}

const ProductTableAdmi: React.FC<ProductTableProps> = ({ onAddProductAdmi }) => {
    const [editedProductName] = useState('');
    const [editedProductPrice] = useState('');
    const [editedProductType] = useState<'Breakfast' | 'Lunch'>('Breakfast');
    const [editedProductImage] = useState('');
    const [productsAdmi, setProductsAdmi] = useState<Product[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddProduct = async () => {
        const newProduct: Product = {
            name: editedProductName,
            price: editedProductPrice,
            type: editedProductType,
            image: editedProductImage,
            id: 0,
        };

        try {
            const response = await fetch(`http://localhost:8080/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                const data = await response.json();
                onAddProductAdmi(data); // Actualizar el estado con el nuevo producto
                setShowAddModal(false);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetch('http://localhost:8080/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
        })
            .then((response) => response.json())
            .then((data: Product[]) => {
                setProductsAdmi(data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <div className="staff-view">
            <table className="table custom-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productsAdmi && productsAdmi.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.type}</td>
                            <td>${product.price}</td>
                            <td>
                                <img className="product-image" src={product.image} alt={product.name} />
                            </td>
                            <td>
                                <EditDeleteButtonsAdmi
                                onEditClickAdmi={() => {
                                    setUserForEdit(user);
                                    handleShowModal();
                                }}
                                onDeleteClickAdmi={() => onRemoveUser(user)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Button className='ButtonAddProduct' onClick={() => setShowAddModal(true)}>Add Product</Button>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Formulario de agregar producto */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductTableAdmi;
