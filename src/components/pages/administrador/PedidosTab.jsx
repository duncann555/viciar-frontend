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
  pedidoSeleccionado,
  setPedidos
}) {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState([]);
  const [dataUsuario, setDataUsuario] = useState([]);


  const obtenerColorEstado = (estado) => {
    if (estado === "Pendiente") return "warning";
    if (estado === "Completado") return "success";
    if (estado === "Cancelado") return "danger";
    return "secondary";
  };

  useEffect(() => {
    const texto = textoBusqueda.trim().toLowerCase();

    if (texto === "") {
      setPedidosFiltrados(pedidos)
      return;
    }

    const resultado = pedidos.filter((p) => {
      return (
        p._id.toLowerCase().includes(texto) ||
        p.estado.toLowerCase().includes(texto)
      )
    })
    setPedidosFiltrados(resultado);
  }, [textoBusqueda, pedidos])



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
              placeholder="Buscar por id o estado..."
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
            />
            <Button
              className="btn-admin-primary"
              onClick={() => setTextoBusqueda(e.target.value)}
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
              {pedidosFiltrados.map((pedido, indice) => (
                <ItemPedido pedido={pedido} key={pedido._id} obtenerColorEstado={obtenerColorEstado} abrirModalPedido={abrirModalPedido} dataUsuario={dataUsuario} indice={indice + 1} setPedidos={setPedidos}></ItemPedido>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

export default PedidosTab;
