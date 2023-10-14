import { Table } from "react-bootstrap"

const ServirPages = () => {
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
                                <th>Número de orden</th>
                                <th>Estatus</th>
                                <th className='text-end'>Acciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Lucía juarez garcía</td>
                                <td>1 </td>
                                <td>Listo para servir</td>
                                <td className='text-end'>
                                    <button type="button" className="btn btn-warning me-1" aria-label="Left Align">
                                        <span className="fa fa-user-edit fa-lg" aria-hidden="true"></span> Servir
                                    </button>
                                </td>

                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Carlos Mendoza Perez</td>
                                <td>2</td>
                                <td>Servido</td>
                                <td className='text-end'>

                                </td>

                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Lucía juarez garcía</td>
                                <td>3 </td>
                                <td>Listo para servir</td>
                                <td className='text-end'>
                                    <button type="button" className="btn btn-warning me-1" aria-label="Left Align">
                                        <span className="fa fa-user-edit fa-lg" aria-hidden="true"></span> Servir
                                    </button>
                                </td>

                            </tr>

                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
        </>
    )
}

export default ServirPages
