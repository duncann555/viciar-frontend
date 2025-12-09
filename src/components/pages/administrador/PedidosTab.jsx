import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";

function PedidosTab({
  pedidos,
  handleCambiarEstadoPedido,
  handleEliminarPedido,
  abrirModalPedido,
}) {
  const [busqueda, setBusqueda] = useState("");

  const q = busqueda.toLowerCase().trim();

  const pedidosFiltrados = pedidos.filter((p) => {
    if (!q) return true;

    return (
      String(p.id).includes(q) ||
      (p.cliente || "").toLowerCase().includes(q) ||
      (p.email || "").toLowerCase().includes(q) ||
      (p.estado || "").toLowerCase().includes(q) ||
      (p.fecha || "").toLowerCase().includes(q)
    );
  });

  const formatearPrecio = (monto) =>
    monto.toLocaleString("es-AR", { style: "currency", currency: "ARS" });

  const obtenerColorEstado = (estado) => {
    if (estado === "Pendiente") return "warning";
    if (estado === "Completado") return "success";
    if (estado === "Cancelado") return "danger";
    return "secondary";
  };

  return (
    <>
      <Row className="align-items-center mb-3 g-2">
        <Col md={4}>
          <p className="text-muted mb-0 text-center mt-2 mt-md-1">
            Administración de pedidos
          </p>
        </Col>

        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar por id, cliente, email, estado o fecha..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <Button
              className="btn-admin-primary"
              onClick={() => setBusqueda(busqueda.trim())}
            >
              Buscar
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Card className="admin-table-card shadow-sm">
        <Card.Body>
          <Card.Title className="fw-semibold text-primary">
            Listado de pedidos
          </Card.Title>

          <Table responsive striped hover className="mt-3 align-middle">
            <thead className="table-primary">
              <tr className="text-center">
                <th>#</th>
                <th>Cliente</th>
                <th>Email</th>
                <th>Fecha</th>
                <th>Ítems</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {pedidosFiltrados.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.email}</td>
                  <td>{pedido.fecha}</td>
                  <td>{pedido.items?.length || 0}</td>
                  <td>{formatearPrecio(pedido.total)}</td>
                  <td>
                    <Badge bg={obtenerColorEstado(pedido.estado)}>
                      {pedido.estado}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      className="me-2"
                      onClick={() => abrirModalPedido(pedido)}
                    >
                      Ver
                    </Button>

                    <Button
                      variant={
                        pedido.estado === "Pendiente"
                          ? "outline-success"
                          : "outline-secondary"
                      }
                      size="sm"
                      className="me-2"
                      onClick={() => handleCambiarEstadoPedido(pedido.id)}
                    >
                      {pedido.estado === "Pendiente"
                        ? "Marcar completado"
                        : "Marcar pendiente"}
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleEliminarPedido(pedido.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}

              {pedidosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-muted">
                    No hay pedidos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

export default PedidosTab;
