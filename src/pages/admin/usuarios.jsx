import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { Modal } from "react-bootstrap";
import UsuarioModal from "../../components/modals/usuario.modal";
import { deleteAllUsers, getAllUsuario} from "../../service/usuarios";
import Swal from 'sweetalert2';

const UsuarioPage = () => {

    /* -------------------------------------------------------------------------- */
    /*                            Constantes de Estado                            */
    /* -------------------------------------------------------------------------- */
   const [showModal, setShowModal] = useState(false); //controla la visibilidad del modal
   const [tipoModal, setTipoModal] = useState('') //controla que tipo de modal se va abrir editar o agregar
   const [usuario,setUsuarios]= useState([]) //controla toda la lista de los usuarios
   const [render, setRender] = useState(false) //cada de cambia de valor va a la bd por lo users y los renderiza 
  const [userSelect,setUserSelect]= useState(null)

  /* -------------------------------------------------------------------------- */
  /*                  Constante efecto - Solicita datos al back                 */
  /* -------------------------------------------------------------------------- */
   useEffect(()=>{
    getAllUsuario().then(data=> setUsuarios(data));
   },[render])


   /* -------------------------------------------------------------------------- */
   /*                             Funciones y metodos                            */
   /* -------------------------------------------------------------------------- */
   const mostrarModal = (type,user) => {
    setTipoModal(type)
    setShowModal(true)
   setUserSelect(user)
   }

   const ocultarModal = () => {
       setShowModal(false)
   }

    const ocultarModalRenderizar =()=>{
        setShowModal(false)
        setRender(!render)
    }



//funcion para eliminar 
const showAlertdelete = (user) => {
    console.log(user)
    Swal.fire({
        title: `Estas seguro de eliminar al usuario ${user.name}?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Sí',
        denyButtonText: `No`,
        customClass: {
          confirmButton: 'custom-button',
      }
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            deleteAllUsers(user.id).then(()=>{
                Swal.fire('Usuario eliminado con éxito!', '', 'success')
                setRender(!render)
            })
         
        } 
      })
  };




  

  return (
     <>
    <div>
     <br />
      <div className="container background-table ">
          <div className="row justify-content-md-end p-3" >
            <div className="col col-md-3">
            <button onClick={() => mostrarModal('Registrar',null)} type="button" className="btn btn-success" aria-label="Left Align">
             <span className="fa fa-user-plus fa-lg" aria-hidden="true"></span> Agregar Usuario
            </button>            
            </div>
          </div>
          <div className="row  p-3">
            <div className="col-md-12">
            <Table  className='table'>
                <thead>
                 <tr>
                <th>#</th>
            <th>Nombre</th>
            <th>email</th>
            <th>Puesto</th>
            <th className='text-end'>Acciones</th>
           
          </tr>
        </thead>
        <tbody>
            {

                usuario.map(user=>(
                    <tr key={user.id}>
                    <td key={user.id}>{user.id} </td>
                    <td key={user.name}>{user.name} </td>
                    <td key={user.email}>{user.email} </td>
                    <td key={user.role}>{user.role} </td>
                    <td className='text-end'>
            <button onClick={() => mostrarModal('Editar',user)} type="button" className="btn btn-success me-1" aria-label="Left Align">
             <span className="fa fa-user-edit fa-lg" aria-hidden="true"></span> Editar
            </button>   
            <button  onClick={()=> showAlertdelete(user) } type="button" className="btn btn-danger ms-1" aria-label="Left Align" >
             <span className="fa fa-trash fa-lg" aria-hidden="true"></span> Eliminar
            </button>   
            </td>
            </tr>
                ))
            }
          
        </tbody>
      </Table>
            </div>
          </div>
        </div>
    </div>
    <Modal dialogClassName="custom-modal" show={showModal} onHide={ocultarModal} variant="success">
    <UsuarioModal type={tipoModal} hasChange={()=> ocultarModalRenderizar() } usuarioEditar= {userSelect}></UsuarioModal>
</Modal>
 </>
  );
};

export default UsuarioPage;
