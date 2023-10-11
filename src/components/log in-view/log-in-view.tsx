import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../index.css';
import { login } from "../../services/tokenRepository";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e: { preventDefault: () => void; }) => { //envia el formulario
    e.preventDefault(); //detiene el comportamiento predeterminado del evento.
    try {
      const data = await login(email, password)
      console.log('Usuario autenticado como mesero');
      navigate('/waiter-view'); // Redirige al mesero a la vista del mesero

    } catch (error) {
      console.error(error);

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
