import { useEffect, useState } from "react";
import UserProfile from "../user-profile/userprofile";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface User {
    email: string;
    role: string;
    id: string;
    password: string;
    name:string;
}

interface staffProps{
    users: User[];
}

const Staff : React.FC<staffProps> = ({ users}) => {
    const navigate = useNavigate();
    const [, setAuthenticated] = useState(false);
    const [, setUsersF] = useState<User[]>([]);


    
    const handleBackClick = () => {
        navigate("/Admi-view");
    };


    const handleLogoutClick = () => {
        setAuthenticated(false);
        navigate("/");
    };

    useEffect(() => {
        fetch("http://localhost:8080/users ", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept-Encoding': 'gzip, deflate, br',
                authorization: "Bearer " + localStorage.getItem("accessToken")
            },
        })
            .then(response => response.json())
            .then((data: User[]) => {
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
                administratorName={""}
                cookName={""}
                showBackButton={true}
            />
            <table>
                <thead>
                    STAFF
                </thead>
                <tbody>
                    {users.map(( user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <button className="edit-button" onClick={() => editUsers(user)}>
                                    <FontAwesomeIcon icon={faCheck} className="check-icon" /> 
                                </button>
                                <button className="delete-button" onClick={() => deleteUsers(user)}>
                                    <FontAwesomeIcon icon={faCheck} className="check-icon" /> 
                                </button>
                                <button className="add-button" onClick={() => addUsers(user)}>
                                    <FontAwesomeIcon icon={faCheck} className="check-icon" /> 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    )
}
export default Staff;
