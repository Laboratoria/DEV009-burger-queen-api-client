import { useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e: { preventDefault: () => void; }) => { //envia el formulario
    e.preventDefault(); //detiene el comportamiento predeterminado del evento.

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.accessToken;
      //donde se esta guardando
      localStorage.setItem("accessToken", accessToken);

      console.log('Usuario autenticado como mesero');
      navigate('/waiter-view'); // Redirige al mesero a la vista del mesero
    } else {
      console.log('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleFormSubmit} id="logInBody">
       <img src="../img/f22f65b8-9001-4b5e-8721-bd87b5d636d2.jpg" alt="Logo" />
      <input
        id="emailbox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        id="passwordbox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button type="submit" id="loginButton">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
