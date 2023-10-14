import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavbarComponent = () => {
    return (
        <div className="backgroundNavbar">
            <header className="header">

    <Navbar expand="lg" className="bg-body-tertiary navbar-dark">
      <Container>
        <Navbar.Brand >
            <img className='imgLogo' src="/src/assets/Burguer__2_-removebg-preview.png" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle  aria-controls="basic-navbar-nav" />
        <Navbar.Collapse    id="basic-navbar-nav">
          <Nav  className="ms-auto">
          <Nav.Link as={NavLink} to="/admin/usuarios  " >Usuarios</Nav.Link> 
          <Nav.Link as={NavLink} to="/admin/productos  " >Productos</Nav.Link> 
          <Nav.Link as={NavLink} to="/admin/ordenar  " >Ordenar</Nav.Link> 
          <Nav.Link as={NavLink} to="/admin/servir" >Servir</Nav.Link> 
          <Nav.Link as={NavLink} to="/admin/chef" >Chef</Nav.Link> 

          <Nav.Link as={NavLink} to="/  " >Cerrar sesión</Nav.Link> 
            {/* <Nav.Link  to="/admin/personas" className={({isActive})=> isActive ? "active" : ""}>            </Nav.Link>
            <Nav.Link  to="/admin/productos">Productos</Nav.Link> */}

             {/* <Nav.Link  >    */}
            
            {/* </Nav.Link> */}
            {/* <Nav.Link  >    */}
           
            {/* </Nav.Link> */}
            {/* <Nav.Link  to="/admin/productos">Productos</Nav.Link> */}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
            </header>
        </div>
    )
}

export default NavbarComponent
