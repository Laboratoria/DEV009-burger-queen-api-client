import React, { useEffect, useState } from "react";
import UserProfile from "../user-profile/userprofile";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import EditDeleteButtons from "../Button-staff/Button-staff";
import "./staff.css"

interface User {
    email: string;
    role: string;
    id: string;
    password: string;
    name: string;
}

const Staff: React.FC = () => {
    const navigate = useNavigate();
    const [, setAuthenticated] = useState(false);
    const [usersF, setUsersF] = useState<User[]>([]);
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userForEdit, setUserForEdit] = useState<User | null>(null);

    const handleBackClick = () => {
        navigate("/Admi-view");
    };

    const handleLogoutClick = () => {
        setAuthenticated(false);
        navigate("/");
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const onRemoveUser = async (user: User) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            });

            if (response.ok) {
                setSuccessMessage('User deleted');
                handleCloseModal();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setErrorMessage('Error deleting user');
            console.error('Error:', error);
        }
    };

    const addUsers = async () => {
        try {
            const response = await fetch("http://localhost:8080/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: "Bearer " + localStorage.getItem("accessToken")
                },
                body: JSON.stringify({
                    email: userEmail,
                    role: userRole,
                    password: userPassword,
                    name: userName
                })
            });

            if (response.ok) {
                setSuccessMessage('User Saved');
                handleCloseModal();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setErrorMessage('Error adding user');
            console.error('Error:', error);
        }
    };

    const editUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${userForEdit?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: "Bearer " + localStorage.getItem("accessToken")
                },
                body: JSON.stringify({
                    email: userEmail,
                    role: userRole,
                    password: userPassword,
                    name: userName
                })
            });

            if (response.ok) {
                setSuccessMessage('User Edited');
                handleCloseModal();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setErrorMessage('Error editing user');
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetch("http://localhost:8080/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept-Encoding': 'gzip, deflate, br',
                authorization: "Bearer " + localStorage.getItem("accessToken")
            },
        })
        .then(response => response.json())
        .then((data: User[]) => {
            console.log("Data from server:", data);
            setUsersF(data);
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
        });
    }, []);

    return (
        <div className="staff-view">
            <UserProfile
                profileType="administrator"
                waiterName=""
                onBackClick={handleBackClick}
                onLogoutClick={handleLogoutClick}
                administratorName=""
                cookName=""
                showBackButton={true}
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usersF && usersF.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <EditDeleteButtons
                                    onEditClick={() => {
                                        setUserForEdit(user);
                                        handleShowModal();
                                    }}
                                    onDeleteClick={() => onRemoveUser(user)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Button variant="primary" onClick={handleShowModal}>
                Add Staff
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{userForEdit ? "Edit User" : "Add User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" value={userRole} onChange={(e) => setUserRole(e.target.value)} placeholder="Role" />
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Name" />
                        </Form.Group>

                        <Button variant="primary" type="button" onClick={userForEdit ? editUser : addUsers}>
                            {userForEdit ? "Edit" : "Add"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {successMessage && <h5>{successMessage}</h5>}
            {errorMessage && <h5>{errorMessage}</h5>}
        </div>
    );
}

export default Staff;
