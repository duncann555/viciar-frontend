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
import Modal from "react-bootstrap/Modal";

import "../../styles/admin.css";

function Admin() {
  const productosIniciales = [
    {
      id: 1,
      nombre: "PS5 Slim",
      categoria: "Consolas",
      stock: 25,
      descripcion: "Descripción corta del producto.",
      ultimoControl: "2025-11-30",
      precio: 800000,
    },
    {
      id: 2,
      nombre: "Red Dead Redemption 2",
      categoria: "Juego PC",
      stock: 0,
      descripcion: "Otro producto de prueba.",
      ultimoControl: "2025-11-15",
      precio: 30000,
    },
  ];

  const usuariosIniciales = [
    {
      id: 1,
      nombre: "Sebastian",
      email: "sebaflomen@gmail.com",
      rol: "admin",
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Matias",
      email: "matias555@gmail.com",
      rol: "usuario",
      estado: "Pendiente",
    },
  ];

  const [productos, setProductos] = useState(productosIniciales);
  const [usuarios, setUsuarios] = useState(usuariosIniciales);

  const [mostrarProductoModal, setMostrarProductoModal] = useState(false);
  const [mostrarUsuarioModal, setMostrarUsuarioModal] = useState(false);

  const [modoProducto, setModoProducto] = useState("crear");
  const [modoUsuario, setModoUsuario] = useState("crear");

  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState(null);
  const [usuarioSeleccionadoId, setUsuarioSeleccionadoId] = useState(null);

  const [productoForm, setProductoForm] = useState({
    nombre: "",
    categoria: "",
    stock: 0,
    descripcion: "",
    fechaControl: "",
    precio: 0,
  });

  const [usuarioForm, setUsuarioForm] = useState({
    nombre: "",
    email: "",
    rol: "",
    estado: "Activo",
  });

  const totalProductos = productos.length;
  const productosSinStock = productos.filter((p) => p.stock === 0).length;
  const totalUsuarios = usuarios.length;

  const handleChangeProducto = (e) => {
    const { name, value } = e.target;
    setProductoForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeUsuario = (e) => {
    const { name, value } = e.target;
    setUsuarioForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const abrirModalProductoCrear = () => {
    setModoProducto("crear");
    setProductoSeleccionadoId(null);
    setProductoForm({
      nombre: "",
      categoria: "",
      stock: 0,
      descripcion: "",
      fechaControl: "",
      precio: 0,
    });
    setMostrarProductoModal(true);
  };

  const abrirModalProductoEditar = (producto) => {
    setModoProducto("editar");
    setProductoSeleccionadoId(producto.id);
    setProductoForm({
      nombre: producto.nombre,
      categoria: producto.categoria,
      stock: producto.stock,
      descripcion: producto.descripcion,
      fechaControl: producto.ultimoControl,
      precio: producto.precio,
    });
    setMostrarProductoModal(true);
  };

  const cerrarModalProducto = () => {
    setMostrarProductoModal(false);
  };

  const abrirModalUsuarioCrear = () => {
    setModoUsuario("crear");
    setUsuarioSeleccionadoId(null);
    setUsuarioForm({
      nombre: "",
      email: "",
      rol: "",
      estado: "Activo",
    });
    setMostrarUsuarioModal(true);
  };

  const abrirModalUsuarioEditar = (usuario) => {
    setModoUsuario("editar");
    setUsuarioSeleccionadoId(usuario.id);
    setUsuarioForm({
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      estado: usuario.estado,
    });
    setMostrarUsuarioModal(true);
  };

  const cerrarModalUsuario = () => {
    setMostrarUsuarioModal(false);
  };

  const handleGuardarProducto = () => {
    const productoParaGuardar = {
      nombre: productoForm.nombre,
      categoria: productoForm.categoria,
      stock: Number(productoForm.stock),
      descripcion: productoForm.descripcion,
      ultimoControl: productoForm.fechaControl,
      precio: Number(productoForm.precio),
    };

    if (modoProducto === "crear") {
      const nuevoId =
        productos.length > 0
          ? Math.max(...productos.map((p) => p.id)) + 1
          : 1;

      setProductos((prev) => [
        ...prev,
        {
          id: nuevoId,
          ...productoParaGuardar,
        },
      ]);
    } else if (modoProducto === "editar" && productoSeleccionadoId !== null) {
      setProductos((prev) =>
        prev.map((p) =>
          p.id === productoSeleccionadoId ? { ...p, ...productoParaGuardar } : p
        )
      );
    }

    cerrarModalProducto();
  };

  const handleGuardarUsuario = () => {
    const usuarioParaGuardar = {
      nombre: usuarioForm.nombre,
      email: usuarioForm.email,
      rol: usuarioForm.rol,
      estado: usuarioForm.estado,
    };

    if (modoUsuario === "crear") {
      const nuevoId =
        usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1;

      setUsuarios((prev) => [
        ...prev,
        {
          id: nuevoId,
          ...usuarioParaGuardar,
        },
      ]);
    } else if (modoUsuario === "editar" && usuarioSeleccionadoId !== null) {
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === usuarioSeleccionadoId ? { ...u, ...usuarioParaGuardar } : u
        )
      );
    }

    cerrarModalUsuario();
  };

  const handleEliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEliminarUsuario = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  const handleSuspenderUsuario = (id) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, estado: u.estado === "Activo" ? "Suspendido" : "Activo" }
          : u
      )
    );
  };

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
                        onClick={() => setMostrarProductoModal(true)}
                      >
                        Editar
                      </Button>

                      <Button variant="outline-danger me-2" size="sm">
                        Suspender
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
                        onClick={() => setMostrarProductoModal(true)}
                      >
                        Editar
                      </Button>

                      <Button variant="outline-danger me-2" size="sm">
                        Suspender
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
                <p className="text-muted mb-0 text-center">
                  Administración de usuarios
                </p>
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
                      <td>Sebastian</td>
                      <td>sebaflomen@gmail.com</td>
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
                          onClick={() => setMostrarUsuarioModal(true)}
                        >
                          Editar
                        </Button>
                        <Button variant="outline-danger me-2" size="sm">
                          Suspender
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          Eliminar
                        </Button>
                      </td>
                    </tr>

                    <tr>
                      <td>2</td>
                      <td>Matias</td>
                      <td>matias555@gmail.com</td>
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
                          onClick={() => setMostrarUsuarioModal(true)}
                        >
                          Editar
                        </Button>
                        <Button variant="outline-danger me-2" size="sm">
                          Suspender
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

      <Modal
        show={mostrarProductoModal}
        onHide={() => setMostrarProductoModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="productoNombre">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese nombre del producto"
              />
            </Form.Group>

            <Form.Select>
              <option value="">Seleccioná una categoría</option>

              <option value="juegos-pc">Juegos de PC</option>
              <option value="juegos-playstation">Juegos de PlayStation</option>
              <option value="juegos-xbox">Juegos de Xbox</option>

              <option value="consolas">Consolas</option>
              <option value="accesorios">Accesorios</option>
            </Form.Select>

            <Form.Group className="mb-3" controlId="productoStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" min="0" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productoDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descripción breve del producto"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productoFechaControl">
              <Form.Label>Fecha de último control</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setMostrarProductoModal(false)}
          >
            Cancelar
          </Button>
          <Button className="btn-primary-admin">Guardar</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={mostrarUsuarioModal}
        onHide={() => setMostrarUsuarioModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="usuarioNombre">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control type="text" placeholder="Ingrese nombre" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="usuarioEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ingrese email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="usuarioRol">
              <Form.Label>Rol</Form.Label>
              <Form.Select>
                <option>Seleccionar rol</option>
                <option value="admin">Administrador</option>
                <option value="usuario">Usuario</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="usuarioEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Select>
                <option>Activo</option>
                <option>Suspendido</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setMostrarUsuarioModal(false)}
          >
            Cancelar
          </Button>
          <Button className="btn-primary-admin">Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Admin;
