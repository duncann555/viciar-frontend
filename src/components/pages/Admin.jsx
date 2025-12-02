import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import "../../styles/admin.css";

function Admin() {
  const [mostrarProductoModal, setMostrarProductoModal] = useState(false);
  const [mostrarUsuarioModal, setMostrarUsuarioModal] = useState(false);

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold text-primary">Panel de Administración</h1>
          <p className="text-muted">
            Gestioná <strong>productos</strong> y <strong>usuarios</strong> del
            sistema.
          </p>
        </Col>
      </Row>

      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="fw-semibold">Productos totales</Card.Title>
              <Card.Text className="fs-3 fw-bold text-primary">123</Card.Text>
              <Badge bg="light" text="dark">
                Datos de ejemplo
              </Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="fw-semibold">Sin stock</Card.Title>
              <Card.Text className="fs-3 fw-bold text-warning">8</Card.Text>
              <Badge bg="warning">Revisar</Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="fw-semibold">
                Usuarios registrados
              </Card.Title>
              <Card.Text className="fs-3 fw-bold text-info">45</Card.Text>
              <Badge bg="info">Activos</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="productos" className="admin-tabs mb-3">
        <Tab eventKey="productos" title="Productos">
          <Row className="align-items-center mb-3 g-2">
            <Col md={4}>
              <Button
                className="btn-admin-primary w-100"
                onClick={() => setMostrarProductoModal(true)}
              >
                + Agregar producto
              </Button>
            </Col>

            <Col md={8}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Buscar producto por nombre o categoría..."
                />
                <Button className="btn-admin-primary">Buscar</Button>
              </InputGroup>
            </Col>
          </Row>

          <Card className="admin-table-card">
            <Card.Body>
              <Card.Title>Listado de productos</Card.Title>
              <Table responsive striped hover className="mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th>Descripción</th>
                    <th>Último control</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>PS5 Slim</td>
                    <td>Consolas</td>
                    <td>
                      <Badge bg="success">25</Badge>
                    </td>
                    <td>Descripción corta del producto.</td>
                    <td>2025-11-30</td>
                    <td>$800.000</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                      >
                        Editar
                      </Button>
                      <Button variant="outline-danger" size="sm">
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Red Dead Redemtion 2</td>
                    <td>Juego PC</td>
                    <td>
                      <Badge bg="danger">0</Badge>
                    </td>
                    <td>Otro producto de prueba.</td>
                    <td>2025-11-15</td>
                    <td>$30.000</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                      >
                        Editar
                      </Button>
                      <Button variant="outline-danger" size="sm">
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="usuarios" title="Usuarios">
          <div className="tab-content-wrapper">
            <Row className="align-items-center mb-3 g-2">
              <Col md={4}>
                <Button
                  className="btn-admin-secondary w-100"
                  onClick={() => setMostrarUsuarioModal(true)}
                >
                  + Agregar usuario
                </Button>
              </Col>

              <Col md={8}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Buscar usuario por nombre o email..."
                  />
                  <Button variant="outline-secondary">Buscar</Button>
                </InputGroup>
              </Col>
            </Row>

            <Card className="admin-table-card shadow-sm">
              <Card.Body>
                <Card.Title className="fw-semibold text-primary">
                  Listado de usuarios
                </Card.Title>

                <Table responsive striped hover className="mt-3">
                  <thead className="table-primary">
                    <tr className="text-center">
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody className="text-center">
                    <tr>
                      <td>1</td>
                      <td>Admin Demo</td>
                      <td>admin@demo.com</td>
                      <td>
                        <Badge bg="dark">admin</Badge>
                      </td>
                      <td>
                        <Badge bg="success">Activo</Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                        >
                          Editar
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          Suspender
                        </Button>
                      </td>
                    </tr>

                    <tr>
                      <td>2</td>
                      <td>Usuario Demo</td>
                      <td>user@demo.com</td>
                      <td>
                        <Badge bg="secondary">usuario</Badge>
                      </td>
                      <td>
                        <Badge bg="warning">Pendiente</Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                        >
                          Editar
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Admin;
