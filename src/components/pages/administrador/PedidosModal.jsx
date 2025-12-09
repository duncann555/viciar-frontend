import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

function PedidoModal({ show, pedido, cerrarModal }) {
  if (!pedido) return null;

  const formatearPrecio = (precio) =>
    precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" });

  return (
    <Modal show={show} onHide={cerrarModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalle de Envio #{pedido.id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5 className="mb-3">Información del cliente</h5>

        <p>
          <strong>Cliente:</strong> {pedido.cliente}
        </p>

        <p>
          <strong>Dirección:</strong> {pedido.direccion}
        </p>
        <p>
          <strong>CP:</strong> {pedido.cp}
        </p>
        <p>
          <strong>Teléfono:</strong> {pedido.telefono}
        </p>
        <p>
          <strong>Email:</strong> {pedido.email}
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
            {pedido.items?.map((item, i) => (
              <tr key={i}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>{formatearPrecio(item.precio)}</td>
                <td>{formatearPrecio(item.precio * item.cantidad)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h4 className="text-end mt-3">
          Total: <Badge bg="success">{formatearPrecio(pedido.total)}</Badge>
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
