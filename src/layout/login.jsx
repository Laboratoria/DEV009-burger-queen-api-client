//import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';
import { useState } from "react";
import {  useNavigate } from 'react-router-dom'; // Importa BrowserRouter y useHistory
import { loginAuth } from "../service/auth";
import Swal from "sweetalert2";


function LoginLayout() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    loginAuth({email,password}).then(response=>{
        if(response.status !=200){
            Swal.fire(response.data, '', 'error')
            return 
        }
          localStorage.setItem('token', response.data.accessToken)
          localStorage.setItem('user', JSON.stringify(response.data.user))
          if(response.data.user.role=== 'administrador'){
            navigateTo('/admin/usuarios')
          }else if (response.data.user.role=== 'mesero'){
            navigateTo('/admin/ordenar')
        }else{
            navigateTo('/admin/chef')
        }

          
        console.log(response)})
  
  };
 
  return (
    
    <div className='Background-Login'>
      <img src='..\src\assets\Diseño sin título (2).png'></img>
      <div className="parte-izquierda">
        <img src="..\src\assets\pexels-valeria-boltneva-1199956.jpg" alt="Logo de la empresa" />
      </div>
     <div className="parte-derecha">
        <img src="..\src\assets\Burguer__2_-removebg-preview.png" alt="Logo de la empresa" />
      
      <h2>Bienvenido de nuevo!</h2>
      <form onSubmit={handleSubmit} action="procesar_login.php" method="POST" className="form-group1"> 
        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico:</label> <br></br>
          <input  type="email"
          id="correo"
          name="correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label> <br></br>
          <input type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      </div>
    </div>
  );
}

export default LoginLayout
