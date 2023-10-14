import { Table } from "react-bootstrap"
import { getAllOrdenes, updateOrden } from "../../service/orders"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const ServirPages = () => {

    const [ordenes, setOrdenes] = useState([]) //Se crea este estado para mostrar las ordenes del la api
    const [render, setRender] = useState(false);
    useEffect(() => {
        //consumir servicio 
        getAllOrdenes().then(respon=> {
            const filterResp = respon.filter((orden)=>orden.status !== 'pending')
            console.log(respon)
            setOrdenes(filterResp)
        } )
    }, [render])


    const UpdateStatus = (id) => {
        const dataUpdate = {
            status: "done"
        }

        updateOrden(id,dataUpdate).then(()=>{
            Swal.fire({text:'Orden servida',icon:'success'})
            setRender(!render)
          })
    }

    return (
<>
<br />

        <div className="container background-table ">
            <div className="row  p-3">

                <div className="col-md-12">
                    <Table responsive="sm" className='table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre del cliente</th>
                                <th>Número de mesa</th>
                                <th>Estatus</th>
                                <th className='text-end'>Acciones</th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                ordenes.map(order=>(
                                    <tr key={order.id}>
                                    <td>{order.id} </td>
                                    <td>{order.client} </td>
                                    <td>{order.mesa}</td>
                                    <td>{order.status == 'done' ? 'Servido': 'Listo para servir'}</td>
                                    <td className='text-end'>

                                    <button  onClick={() => UpdateStatus(order.id)} type="button"  hidden={order.status=='done'} className="btn btn-warning me-1" aria-label="Left Align">
                                        <span className="fa fa-user-edit fa-lg" aria-hidden="true"  ></span> Servir
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
        </>
    )
}

export default ServirPages
