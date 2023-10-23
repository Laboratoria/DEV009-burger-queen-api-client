import  { useState } from "react"; //revisa cambios en el estado
import { useNavigate } from "react-router-dom"; //sirve para navegar en el app
import './login.css'; //diseño de login
import { login } from "../../services/tokenRepository";  //token unión con api mock

const LoginForm = () => {   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e: { preventDefault: () => void; }) => {  //evento en el formulario
    e.preventDefault();

    try {
      const data = await login(email, password);
      console.log(data);
      const userRole = localStorage.getItem("userRole"); 

      console.log(`userRole from localStorage: ${userRole}`);

      switch (userRole) { //utiliza como praámetro el role
        case 'waiter': //role
          console.log('Usuario autenticado como mesero'); // va a autenticar al mesero
          navigate('/waiter-view'); //te va a llevar a su vista waiter-view
          break;
        case 'admin':
          console.log('Usuario autenticado como administrador');
          navigate('/admi-view');
          break;
        case 'chef':
          console.log('Usuario autenticado como chef');
          navigate('/chef-view');
          break;
        default:
          console.log(`Rol desconocido: ${userRole}`); 
      }
    } catch (error) { //primer error si es un role desconocido
      if (typeof error === 'string' && error.includes("Invalid email or password, please check your credentials.")) {
    }
    }
  };


  return (
    <form onSubmit={handleFormSubmit} className="logInBody">  {/*creación de formulario, se envñia cuando se hace click y luego se ejecuta la función*/}
      <img className="logo" src="../img/f22f65b8-9001-4b5e-8721-bd87b5d636d2.jpg" alt="Logo" /> {/*importando logo*/}
      <div id="square">
        <input
          id="emailbox"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)} /*llama a setEmail para checar el cambio del estado*/
          placeholder="ENTER EMAIL"
        />
        <input
          id="passwordbox"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} /*llama a setPasswprd para checar el cambio del estado*/
          placeholder="ENTER PASSWORD"
        />
        <button type="submit" id="loginButton">LOGIN</button> {/*/submit se refiere al evento que ocurre cuando un usuario envía el formulario.*/}
      </div>
    </form>
  );
};

export default LoginForm;
