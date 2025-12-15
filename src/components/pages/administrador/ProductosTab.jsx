import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";

function ProductosTab({
  productos,
  abrirModalProductoCrear,
  abrirModalProductoEditar,
  handleEliminarProducto,
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
              {productos.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>

                  <td>
                    <img
                      src={prod.imagenUrl}
                      alt={prod.nombre}
                      style={{
                        width: "56px",
                        height: "56px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </td>

                  <td>{prod.nombre}</td>
                  <td>{prod.categoria}</td>

                  <td>
                    <Badge bg={obtenerColorBadgeStock(prod.stock)}>
                      {prod.stock}
                    </Badge>
                  </td>

                  <td>{new Date(prod.ultimoControl).toLocaleString("es-AR")}</td>
                  <td>{formatearPrecio(prod.precio)}</td>

                  <td>
                    <Badge bg={prod.estado === "Activo" ? "success" : "warning"}>
                      {prod.estado}
                    </Badge>
                  </td>

                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => abrirModalProductoEditar(prod)}
                    >
                      Editar
                    </Button>

                    <Button
                      variant={
                        prod.estado === "Activo"
                          ? "outline-warning"
                          : "outline-success"
                      }
                      size="sm"
                      className="me-2"
                      onClick={() => handleSuspenderProducto(prod.id)}
                    >
                      {prod.estado === "Activo" ? "Suspender" : "Activar"}
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleEliminarProducto(prod.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
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
