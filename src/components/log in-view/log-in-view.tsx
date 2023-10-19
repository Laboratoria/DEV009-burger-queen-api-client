import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { login } from "../../services/tokenRepository";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const data = await login(email, password);
      console.log(data);
      const userRole = localStorage.getItem("userRole");

      console.log(`userRole from localStorage: ${userRole}`);

      switch (userRole) {
        case 'waiter':
          console.log('Usuario autenticado como mesero');
          navigate('/waiter-view');
          break;
        case 'admin':
          console.log('Usuario autenticado como administrador');
          navigate('/admin-view');
          break;
        case 'chef':
          console.log('Usuario autenticado como chef');
          navigate('/chef-view');
          break;
        default:
          console.log(`Rol desconocido: ${userRole}`);
      }
    } catch (error) {
      if (typeof error === 'string' && error.includes("Invalid email")) {
        alert("El correo es incorrecto");
      } else if (typeof error === 'string' && error.includes("Invalid password")) {
        alert("La contraseña es incorrecta");
      } else {
        alert("Invalid email or password, please check your credentials.");
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} id="logInBody">
      <img className="logo" src="../img/f22f65b8-9001-4b5e-8721-bd87b5d636d2.jpg" alt="Logo" />
      <div id="cuadrito">
        <input
          id="emailbox"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER EMAIL"
        />
        <input
          id="passwordbox"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="ENTER PASSWORD"
        />
        <button type="submit" id="loginButton">LOGIN</button>
      </div>
    </form>
  );
};

export default LoginForm;
