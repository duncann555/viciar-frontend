import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { useEffect, useState } from "react";
import { obtenerUsuarioIDAPI } from "../../../helpers/queries";

function PedidoModal({ show, pedidoSeleccionado, cerrarModal }) {
  if (!pedidoSeleccionado) return null;

  const [datoUsuario, setDatoUsuario] = useState([]);

  useEffect(() => {
    obtenerUsuario();
  }, [])

  const obtenerUsuario = async () => {
    const respuesta = await obtenerUsuarioIDAPI(pedidoSeleccionado.detallePedido.usuario);
    console.log(respuesta);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      console.log(`Data user: ${JSON.stringify(datos)}`);
      setDatoUsuario(datos);
    }
  }

  return (
    <Modal show={show} onHide={cerrarModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalle de Envio</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5 className="mb-3">Información del cliente</h5>

        <p>
          <strong>Cliente:</strong> {datoUsuario.nombre + " " + datoUsuario.apellido}
        </p>

        <p>
          <strong>Dirección:</strong> {pedidoSeleccionado.detallePedido.domicilio}
        </p>
        <p>
          <strong>Codigo Postal:</strong> {pedidoSeleccionado.detallePedido.codigoPostal}
        </p>
        <p>
          <strong>Teléfono:</strong> {datoUsuario.telefono}
        </p>
        <p>
          <strong>Email:</strong> {datoUsuario.email}
        </p>

        <h5 className="mt-4 mb-3">Ítems del pedido</h5>

        <Table striped hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {pedidoSeleccionado.items?.map((item, i) => (
              <tr key={i}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>{item.precio}</td>
                <td>{item.precio * item.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h4 className="text-end mt-3">
          Total: <Badge bg="success">${pedidoSeleccionado.total}</Badge>
        </h4>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PedidoModal;
