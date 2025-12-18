import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { eliminarProductoAPI, obtenerProductoNombreAPI, obtenerProductosAPI } from "../../../helpers/queries";
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

  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [productosFiltados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    setProductosFiltrados(productos);

  }, [productos])

  useEffect(() => {
    const texto = textoBusqueda.trim().toLowerCase();

    if (texto === "") {
      setProductosFiltrados(productos);
      return;
    }
    const resultado = productos.filter((p) => {
      return (
        p.nombre?.toLowerCase().includes(texto) ||
        p.categoria?.toLowerCase().includes(texto) ||
        p.estado?.toLowerCase().includes(texto) ||
        p.precio?.toString().includes(texto) ||
        p.stock?.toString().includes(texto) ||
        p.ultimoControl.toLowerCase().includes(texto)
      )
    })
    setProductosFiltrados(resultado);
  }, [textoBusqueda, productos])


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
              placeholder="Buscar por nombre, categoría, último control, precio o estado..."
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
            />
            <Button
              className="btn-admin-primary"
              onClick={(e) => {
                setTextoBusqueda(e.target.value)
              }}
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
              {productosFiltados.map((itemProducto, indice) => (
                <ItemProducto itemProducto={itemProducto} key={itemProducto._id} obtenerColorBadgeStock={obtenerColorBadgeStock} fila={indice + 1} setProductos={setProductos} abrirModalProductoEditar={abrirModalProductoEditar}></ItemProducto>
              ))}
              {productosFiltados.length === 0 && (
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
