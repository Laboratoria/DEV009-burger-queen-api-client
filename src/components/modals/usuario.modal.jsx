import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import  PropTypes  from "prop-types"

import { postUsers, updateUsers } from "../../service/usuarios";
import Swal from "sweetalert2";
import { useState } from "react";



const UsuarioModal = ({type,hasChange,usuarioEditar }) => {

console.log(usuarioEditar)

    const [email, setEmail] = useState(type=='Editar'?usuarioEditar.email:'');
    const [role, setRole] = useState(type=='Registrar'?'':usuarioEditar.role);
    const [name, setName] = useState(type=='Editar'?usuarioEditar.name:'');
    
    
    
    const save = (e)=> {
     e.preventDefault();
    const dataPost ={
    email: email,
    password: '1234',
    role: role ,
    name:name
  }

if(type==='Registrar'){
    postUsers(dataPost).then(()=>{
        Swal.fire('Usuario creado con éxito!', '', 'success')
        //Limpieza de datos
        hasChange()
      })
}else {
    updateUsers(usuarioEditar.id,dataPost).then(()=>{
        Swal.fire('Usuario actualizado con éxito!', '', 'success')
        //Limpieza de datos
        hasChange()
      })
}

 



    }

    return (
        <div className="bg-dark text-white">
             <Form  onSubmit={save} >
            <Modal.Header closeButton>
                <Modal.Title>{type} Usuarios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder=""  value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder=""  value={email} onChange={(e) =>  setEmail(e.target.value)} />
      </Form.Group>
      <FormGroup>
      <Form.Label>Puesto</Form.Label>
      <Form.Select aria-label="Select de tipos"  name="role"  value={role} onChange={(e) =>  setRole(e.target.value) }>
      <option>Tipo </option>
      <option value="chef">Chef</option>
      <option value="administrador">Administrador</option>
      <option value="mesero">Mesero</option>
    </Form.Select>
    </FormGroup>
      
            </Modal.Body>
            <Modal.Footer>
            {type === "Editar" ? (
          <Button variant="success" type="submit">Editar usuario</Button>
        ) : (
          <Button variant="success" type="submit" >Crear usuario</Button>
          
        )}
        </Modal.Footer>
        </Form>

        </div>
    );
}
UsuarioModal.propTypes = {
    type: PropTypes.string.isRequired,
    hasChange:PropTypes.any,
    usuarioEditar:PropTypes.any
    
  };

export default UsuarioModal
