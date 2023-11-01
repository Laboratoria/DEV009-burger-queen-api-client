import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';


interface Product {
    id: number;
    name: string;
    price: number;
    type: string;
    image: string;
  }

const EditDeleteButtonsAdmi: React.FC = (product) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedProductName, setEditedProductName] = useState(product);
    const [editedProductPrice, setEditedProductPrice] = useState(product);
    const [editedProductType, setEditedProductType] = useState<"Breakfast" | "Lunch">( "Breakfast");
    const [editedProductImage, setEditedProductImage] = useState(product);
    const [editProduct, setEditProduct] = useState<Product[]>([]);
    

    const handleEditProduct = async () => {
        try {
            const response = await fetch(`'http://localhost:8080/products'`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
                body: JSON.stringify({
                    name: editedProductName,
                    price: editedProductPrice,
                    type: editedProductType,
                    image: editedProductImage,
                }),
            });

            if (response.ok) {
                // Edición exitosa
               setEditProduct(product);
                setShowEditModal(false); // Cierra el modal de edición
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRemoveProduct = async () => {
        try {
            const response = await fetch('http://localhost:8080/products', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            });
    
            if (response.ok) {
                onDeleteClickAdmi(); // Actualiza el estado en el componente padre
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <div>
            <button className="edit-button" onClick={() => setShowEditModal(true)}>
                Edit
            </button>
            <button className="delete-button" onClick={() => handleRemoveProduct}>
                Delete
            </button>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"   onChange={(e) => setEditedProductName(e.target.value)}
                                placeholder="Enter name"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={editedProductType}
                                onChange={(e) => setEditedProductType(e.target.value as 'Breakfast' | 'Lunch')}>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => setEditedProductPrice(Number(e.target.value))}
                                placeholder="Enter price"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicImage">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setEditedProductImage(e.target.value)}
                                placeholder="Enter image URL"
                            />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={handleEditProduct}>
                        Save Changes
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EditDeleteButtonsAdmi;




