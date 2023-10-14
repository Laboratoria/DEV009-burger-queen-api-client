import { Button, Card, Modal } from "react-bootstrap"
import OrdenarModal from "../../components/modals/ordenar.modal";
import { useState, useEffect } from "react";
import { getAllProductos } from "../../service/producto";




const OrdenarPages = () => {
    //declaración de una variable de estado
   
    const [showModal, setShowModal] = useState(false);
    const [tipoModal, setTipoModal] = useState('')

    const [productos,setProductos]= useState([])

    //funcion useEfect para hacer la peticion cuando cargue la pagina 
useEffect(()=>{
    //consumir servicio 
    getAllProductos().then(respon=> setProductos(respon));
   },[])

    const mostrarModal = (type) => {
        setShowModal(true)
        setTipoModal(type)
    }
    const ocultarModal = () => {
        setShowModal(false)

    }

    return (
        <>
        <div className="container overflow-hidden ">
            <br />
            <div className="row mb-5">
                <div className="col-md-3  ">
                    <h2 className="text-white">Desayuno</h2>
                </div>
                <div className="col-md-3">
                    <h2 className="text-white">Resto del día</h2>
                </div>
                <div className="col-md-3 offset-md-3">
                    <button onClick={() => mostrarModal('Registrar')} type="button" className="btn btn-success me-1" aria-label="Left Align">
                        <span className="fa fa-user-edit fa-lg" aria-hidden="true"></span> Ver orden
                    </button>
                </div>

            </div>
            <div className="row g-5">

            {productos.map((producto) => (
            <div className="col-xl-3 col-md-4 col-sm-6" key={producto.id}>
              <Card className="fondo-de-tarjeta">
                <div>
                  <img className="cardImg" src={producto.image} alt={producto.name} />
                 
                </div>
                <Card.Body>
                  <Card.Title className="texto-tarjeta">{producto.name}</Card.Title>
                  <Card.Text className="texto-tarjeta">${producto.price}</Card.Text>
                  <Button variant="success">Agregar</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
                {/* <div className=" col-xl-3 col-md-4 col-sm-6 ">
                    <Card className="fondo-de-tarjeta" >
                        <div>
                        <img  className="cardImg" src="/src/assets/jugo de naranja.jpeg" alt="Jugo de naranja" />
                        </div>
                       
                        <Card.Body>
                            <Card.Title>Jugo de naranja</Card.Title>
                            <Card.Text>
                                $7
                            </Card.Text>
                            <Button variant="success">Agregar</Button>
                        </Card.Body>
                    </Card>
                </div> */}
                {/* <div className=" col-xl-3 col-md-4 col-sm-6 ">
                    <Card className="fondo-de-tarjeta">
                    <div>
                        <img  className="cardImg" src="/src/assets/sandwi.jpg" alt="Jugo de naranja" />
                        </div>
                        <Card.Body>
                            <Card.Title>Sandwich de jamón y queso</Card.Title>
                            <Card.Text>
                $10
                            </Card.Text>
                            <Button variant="success">Agregar</Button>
                        </Card.Body>
                    </Card> */}
                {/* </div> <div className=" col-xl-3 col-md-4 col-sm-6 ">
                    <Card className="fondo-de-tarjeta">
                    <div>
                        <img  className="cardImg" src="/src/assets/aros.jpg" alt="Jugo de naranja" />
                        </div>
                        <Card.Body>
                            <Card.Title>Aros de cebolla</Card.Title>
                            <Card.Text>
                              $5  
                            </Card.Text>
                            <Button variant="success">Agregar</Button>
                        </Card.Body>
                    </Card>
                </div> 
                <div className=" col-xl-3 col-md-4 col-sm-6 ">
                    <Card className="fondo-de-tarjeta">
                    <div>
                        <img  className="cardImg" src="/src/assets/cafe.jpg" alt="Jugo de naranja" />
                        </div>
                        <Card.Body>
                            <Card.Title>Cafe americano</Card.Title>
                            <Card.Text>
                                $5
                            </Card.Text>
                            <Button variant="success">Agregar</Button>
                        </Card.Body>
                    </Card>
                </div> */}
                {/* <div className=" col-xl-3 col-md-4 col-sm-6 ">
                    <Card className="fondo-de-tarjeta">
                    <div>
                        <img  className="cardImg" src="/src/assets/hamburguesa.jpg" alt="Jugo de naranja" />
                        </div>
                        <Card.Body>
                            <Card.Title>Hamburguesa doble</Card.Title>
                            <Card.Text>
                                $15
                            </Card.Text>
                            <Button variant="success">Agregar</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className=" col-xl-3 col-md-4 col-sm-6 ">
                    <Card className="fondo-de-tarjeta">
                    <div>
                        <img  className="cardImg" src="/src/assets/papasfri.jpg" alt="Jugo de naranja" />
                        </div>
                        <Card.Body>
                            <Card.Title>Papas fritas</Card.Title>
                            <Card.Text>
                               $5
                            </Card.Text>
                            <Button variant="success">Agregar</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className=" col-xl-3 col-md-4 col-sm-6 ">
                    <Card className="fondo-de-tarjeta">
                    <div>
                        <img  className="cardImg" src="/src/assets/cafeleche.jpg" alt="Jugo de naranja" />
                        </div>                        <Card.Body>
                            <Card.Title>Cafe con leche</Card.Title>
                            <Card.Text>
                              $10
                            </Card.Text>
                            <Button variant="success">Agregar</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className=" col-xl-3 col-md-4 col-sm-6 ">
                    <Card className="fondo-de-tarjeta">
                    <div>
                        <img  className="cardImg" src="/src/assets/jugo de naranja.jpeg" alt="Jugo de naranja" />
                        </div>
                        <Card.Body>
                            <Card.Title>Jugo de pepino</Card.Title>
                            <Card.Text>
                                $6
                            </Card.Text>
                            <Button variant="success">Agregar</Button>
                        </Card.Body>
                    </Card>
                </div> */}
            </div>
        </div>
         <Modal dialogClassName="custom-modal" show={showModal} onHide={ocultarModal} variant="success">
         <OrdenarModal type={tipoModal}></OrdenarModal>
     </Modal>
      </>
    )
}

export default OrdenarPages
