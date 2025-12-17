import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { useEffect, useState } from "react";
import ItemPedido from "../ItemPedido";
import { obtenerUsuarioIDAPI } from "../../../helpers/queries";

function PedidosTab({
  pedidos,
  abrirModalPedido,
  pedidoSeleccionado
}) {
  const [busqueda, setBusqueda] = useState("");
  const q = busqueda.toLowerCase().trim();
  const [dataUsuario, setDataUsuario] = useState([]);

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
                <th>ID Pedido</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {pedidos.map((pedido) => (
                <ItemPedido pedido={pedido} key={pedido._id} obtenerColorEstado={obtenerColorEstado} abrirModalPedido={abrirModalPedido} dataUsuario={dataUsuario}></ItemPedido>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

export default PedidosTab;
