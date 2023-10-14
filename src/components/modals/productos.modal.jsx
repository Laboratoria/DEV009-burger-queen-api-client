import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import PropTypes from "prop-types"
import { useState } from "react";


const ProductosModal = ({ type, product, onClose, onSave }) => {

  const [formData, setFormData] = useState({
    name: product ? product.name : "",
    type: product ? product.type : "",
    price: product ? product.price : 0,
    image: product ? product.image : "",
  });

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(type === "Registrar", formData);
    onClose();
  };
  return (
    <div className="bg-dark text-white">
      <Modal.Header closeButton>
        <Modal.Title>{type} Productos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="" />
          </Form.Group>
          <Form.Group controlId="imagen">
            <Form.Label>Imagen (URL)</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
            />
          </Form.Group>
          <FormGroup controlId="nombre">
            <Form.Label>Tipo</Form.Label>

            <Form.Select aria-label="Default select example" as="select"
              name="type"
              value={formData.type}
              onChange={handleInputChange}>
              <option value="0">Tipo </option>
              <option value="Desayuno">Desayuno</option>
              <option value="Almuerzo">Almuerzo</option>
              <option value="Resto de día">Resto de día</option>
            </Form.Select>
          </FormGroup>

          <Form.Group className="mb-3" controlId="precio">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="success" onClick={handleSave}>
          {type === "Editar" ? "Guardar Cambios" : "Crear Producto"}
        </Button>
      </Modal.Footer>

    </div>
  );
}
ProductosModal.propTypes = {
  type: PropTypes.string.isRequired,
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProductosModal
