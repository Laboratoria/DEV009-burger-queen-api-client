import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const ChefPage = () => {
  return (
    <div className='chef-container'>
       <h1>Bienvenido Chef</h1>
            <div className='orders-container'>
            <div> 
            <h2>Pedidos Pendientes</h2>
                    <Card style={{ width: '18rem' }}className='orders-cards-back'>
                        <Card.Body>
                            <Card.Title>Nombre: </Card.Title>
                            <Card.Title>Fecha: </Card.Title>
                            <Card.Title>Hora: </Card.Title>
                            <hr></hr>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the cards content.
                            </Card.Text>
                            
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
            </div>   
            <div> 
            <h2>Pedidos Entregados</h2>
                    <Card style={{ width: '18rem' }} className='orders-cards-delivered'>
                        <Card.Body>
                            <Card.Title>Nombre: </Card.Title>
                            <Card.Title>Fecha: </Card.Title>
                            <Card.Title>Hora: </Card.Title>
                            <hr></hr>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the cards content.
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
            </div>
            </div>         
    </div>
  )
}

export default ChefPage
