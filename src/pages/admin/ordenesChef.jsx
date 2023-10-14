import { getAllOrdenes, deleteOrder } from "../../service/orders"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import Swal from 'sweetalert2'

const OrdenesChef = () => {

    const [ordenes, setOrdenes] = useState([])
    const [render, setRender] = useState(false)

    useEffect(() => {
        getAllOrdenes().then(data => setOrdenes(data));
    }, [render])

    const convertirMarcaTiempo = (marcaTiempo) => {
        if (typeof marcaTiempo === 'number') {
            // Si la marca de tiempo es un número, asumimos que está en milisegundos.
            const fechaHora = new Date(marcaTiempo);
            const options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            };
            return fechaHora.toLocaleDateString('es-ES', options);
        } else if (typeof marcaTiempo === 'string') {
            console.log(marcaTiempo);
            // Si la marca de tiempo es una cadena, asumimos que ya está en el formato deseado.
            return marcaTiempo;
            
        } else {
            // En caso de que no sea ni un número ni una cadena válida, puedes manejarlo según tus necesidades.
            return 'Formato de fecha no válido';
        }
        
    };   
    
    const showAlertdelete = (order) => {
        console.log(order)
        Swal.fire({
            title: `Estas seguro de eliminar la orden de ${order.client}?`,
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
                deleteOrder(order.id).then(()=>{
                    Swal.fire('Orden eliminada con éxito!', '', 'success')
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

                        </div>
                    </div>
                    <div className="row  p-3">
                        <div className="col-md-12">
                            <Table className='table'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre del cliente</th>
                                        <th>Número de mesa</th>
                                        <th>Fecha y hora</th>
                                        <th className='text-end'>Acciones</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        ordenes.map(order => (
                                            <tr key={order.id}>
                                                <td>{order.id} </td>
                                                <td>{order.client} </td>
                                                <td>{order.mesa}</td>
                                                <td>{convertirMarcaTiempo(order.dateEntry)}</td>
                                                <td className='text-end'>

                                                    <button onClick={()=> showAlertdelete(order) } type="button" className="btn btn-danger ms-1" aria-label="Left Align" >
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

        </>
    );
}

export default OrdenesChef