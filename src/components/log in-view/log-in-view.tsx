import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../index.css';
import { login } from "../../services/tokenRepository";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Detiene el comportamiento predeterminado del evento.
  
    try {
      const data = await login(email, password); // Intenta autenticar al usuario
  
      switch (data.role) {
        case 'admin':
          navigate('/admin-view'); // Redirige al usuario con rol de admin a la vista de administrador
          break;
        case 'waiter':
          navigate('/waiter-view'); // Redirige al usuario con rol de mesero a la vista de mesero
          break;
        case 'chef':
          navigate('/chef-view'); // Redirige al usuario con rol de chef a la vista de chef
          break;
        default:
          console.error('Rol desconocido:', data.role); // Imprime un mensaje de error si el rol es desconocido
      }
    } catch (error) {
      console.error(error); // Maneja los errores, si los hay
    }
  };
  

  return (
    <form onSubmit={handleFormSubmit} id="logInBody">
       <img className="logo" src="../img/f22f65b8-9001-4b5e-8721-bd87b5d636d2.jpg" alt="Logo" />
      <div id= "cuadrito">
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
