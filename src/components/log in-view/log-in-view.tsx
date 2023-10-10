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
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
