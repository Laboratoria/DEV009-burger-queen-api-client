import { useState } from 'react';

const FormLogIn = ({ setEmail, setPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí deberías hacer la autenticación utilizando las credenciales
    // y posiblemente la API MOCK

    // Ejemplo:
    if (email === 'usuario@dominio.com' && password === 'contraseña') {
      console.log('Usuario autenticado');
    } else {
      console.log('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default FormLogIn;
