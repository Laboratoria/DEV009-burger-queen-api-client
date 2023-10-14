import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';
import LogoUrl from '../assets/Burguer__2_-removebg-preview.png' 



const NavbarComponent = () => {

     // Initialize user data state with the value from localStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigateTo = useNavigate();

  // Use useEffect to update user data when it changes in localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  let elementsNavbar;

  if (user && user.role === 'administrador') {
    elementsNavbar = (
      <>
        <Nav.Link as={NavLink} to="/admin/usuarios">Usuarios</Nav.Link>
        <Nav.Link as={NavLink} to="/admin/productos">Productos</Nav.Link>
        <Nav.Link as={NavLink} to="/admin/ordeneschef">Ordenes</Nav.Link>
      </>
    );
  } else if (user && user.role === 'chef') {
    elementsNavbar = (
      <>
      <Nav.Link as={NavLink} to="/admin/chef">Chef</Nav.Link>
      </>
    );
  } else {
    elementsNavbar = (
      <>
        <Nav.Link as={NavLink} to="/admin/ordenar">Ordenar</Nav.Link>
        <Nav.Link as={NavLink} to="/admin/servir">Servir</Nav.Link>
      </>
    );
  }


  //cerrar sesion

  const cerrarSesion=()=>{
    localStorage.clear()
    navigateTo('/')
  }
 

    return (
        <div className="backgroundNavbar">
            <header className="header">

    <Navbar expand="lg" className="bg-body-tertiary navbar-dark">
      <Container>
        <Navbar.Brand >
            <img className='imgLogo' src={LogoUrl} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle  aria-controls="basic-navbar-nav" />
        <Navbar.Collapse    id="basic-navbar-nav">
          <Nav  className="ms-auto">
    
          {elementsNavbar}
          <Nav.Link onClick={cerrarSesion} >Cerrar sesión</Nav.Link> 
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
            </header>
        </div>
    )
}

export default NavbarComponent
