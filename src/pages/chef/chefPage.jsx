import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAllOrdenes, updateOrden } from "../../service/orders"
import { useEffect, useState } from "react"

const ChefPage = () => {

    
    const [ordenesPendientes, setOrdenesPendientes] = useState([]); // Estado para órdenes pendientes
    const [ordenesEntregando, setOrdenesEntregando] = useState([]); 

    useEffect(() => {
        // Consumir servicio
        getAllOrdenes().then(respon => {
            const filterRespPendientes = respon.filter((orden) => orden.status === "pending");
            setOrdenesPendientes(filterRespPendientes);
        });
    }, []);

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
      

    const moverOrdenEntregando = async (orden) => {
        try {
            // Cambia el estado de la orden a "delivering" en la API
            console.log("ID de la orden antes de la eliminación:", orden.id);

            const updatedOrden = await updateOrden(orden.id, { status: "delivering" });

            // Actualiza las listas de órdenes pendientes y entregando en el estado local
            setOrdenesEntregando([...ordenesEntregando, updatedOrden]);
            setOrdenesPendientes(ordenesPendientes.filter((o) => o.id !== orden.id));
            console.log(ordenesPendientes);
        } catch (error) {
            console.error('Error al actualizar la orden:', error);
            
            // Maneja el error aquí (por ejemplo, muestra un mensaje al usuario)
        }
    };

    return (
        <div className='chef-container'>
            <h1>Bienvenido Chef</h1>
            <div className='orders-container'>
                <h2>Pedidos Pendientes</h2>
                <div className='container-cards-orders-pending'>

                    {ordenesPendientes.map((orden) => (
                        <Card key={orden.id} style={{ width: '18rem' }} className='orders-cards-back'>
                            <Card.Body>
                                <Card.Title>Nombre: {orden.client}</Card.Title>
                                <Card.Title>Mesa: {orden.mesa}</Card.Title>
                                <Card.Title>Fecha y Hora: {convertirMarcaTiempo(orden.dateEntry)}</Card.Title>
                                <hr></hr>
                                <Card.Text>
                                    {orden.products.map((producto, index) => (
                                        <div key={index}>
                                            <p>{producto.cantidad} {producto.name}</p>
                                            
                                        </div>
                                    ))}
                                </Card.Text>
                                <Button variant="warning" onClick={() => moverOrdenEntregando(orden)}>Orden lista</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <h2>Pedidos Entregados</h2>
                <div className='container-cards-orders-delivering'>
                    {ordenesEntregando.map((orden) => (
                        <Card key={orden.id} style={{ width: '18rem' }} className='orders-cards-delivered'>
                            <Card.Body>
                                <Card.Title>Nombre: {orden.client}</Card.Title>
                                <Card.Title>Mesa: {orden.mesa}</Card.Title>
                                <Card.Title>Fecha y Hora: {convertirMarcaTiempo(orden.dateEntry)}</Card.Title>
                                
                                <hr />
                                <Card.Text>
                                    {orden.products.map((producto, index) => (
                                        <div key={index}>
                                            <p>{producto.cantidad} {producto.name}</p>
                                        </div>
                                    ))}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChefPage
