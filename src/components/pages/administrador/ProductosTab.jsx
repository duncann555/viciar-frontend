import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { eliminarProductoAPI, obtenerProductosAPI } from "../../../helpers/queries";
import Swal from "sweetalert2";
import ItemProducto from "./ItemProducto";

function ProductosTab({
  productos,
  setProductos,
  abrirModalProductoCrear,
  abrirModalProductoEditar,
  handleSuspenderProducto,
  obtenerColorBadgeStock,
  formatearPrecio,
}) {
  const [busqueda, setBusqueda] = useState("");

  const q = busqueda.toLowerCase().trim();
  // console.log(productos);

  // const productosFiltrados = productos.filter((p) => {
  //   if (!q) return true;

  //   return (
  //     String(p.id).includes(q) ||
  //     (p.nombre || "").toLowerCase().includes(q) ||
  //     (p.categoria || "").toLowerCase().includes(q) ||
  //     (p.ultimoControl || "").toLowerCase().includes(q) ||
  //     String(p.precio ?? "").toLowerCase().includes(q) ||
  //     (p.estado || "").toLowerCase().includes(q)
  //   );
  // });


  return (
    <>
      <Row className="align-items-center mb-3 g-2">
        <Col md={4}>
          <Button
            className="btn-admin-primary w-100"
            onClick={abrirModalProductoCrear}
          >
            + Agregar producto
          </Button>
        </Col>

        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar por #, nombre, categoría, último control, precio o estado..."
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
            Listado de productos
          </Card.Title>

          <Table responsive striped hover className="mt-3 align-middle">
            <thead className="table-primary">
              <tr className="text-center">
                <th>#</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Último control</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {productos.map((itemProducto, indice) => (
                <ItemProducto itemProducto={itemProducto} key={itemProducto._id} obtenerColorBadgeStock={obtenerColorBadgeStock} fila={indice + 1} setProductos={setProductos} abrirModalProductoEditar={abrirModalProductoEditar}></ItemProducto>
              ))}
              {productos.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center text-muted">
                    No hay productos que coincidan con la búsqueda.
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

export default ProductosTab;
