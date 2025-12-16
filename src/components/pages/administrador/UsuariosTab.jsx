import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";

function UsuariosTab({
  usuarios,
  abrirModalUsuarioEditar,
  handleEliminarUsuario,
  handleSuspenderUsuario,
}) {
  const [busqueda, setBusqueda] = useState("");

  const q = busqueda.toLowerCase().trim();

  const usuariosFiltrados = usuarios.filter((u) => {
    if (!q) return true;

    return (
      String(u.id).includes(q) ||
      (u.nombre || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.rol || "").toLowerCase().includes(q) ||
      (u.estado || "").toLowerCase().includes(q)
    );
  });

  return (
    <>
      <Row className="align-items-center mb-3 g-2">
        <Col md={4}>
          <p className="text-muted mb-0 text-center mt-2 mt-md-1">
            Administración de usuarios
          </p>
        </Col>

        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar por id, nombre, email, rol o estado..."
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
              {usuariosFiltrados.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>
                    <Badge bg={user.rol === "admin" ? "dark" : "secondary"}>
                      {user.rol}
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      bg={
                        user.estado === "Activo"
                          ? "success"
                          : user.estado === "Suspendido"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {user.estado}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => abrirModalUsuarioEditar(user)}
                    >
                      Editar
                    </Button>

                    <Button
                      variant={
                        user.estado === "Activo"
                          ? "outline-warning"
                          : "outline-success"
                      }
                      size="sm"
                      className="me-2"
                      onClick={() => handleSuspenderUsuario(user.id)}
                    >
                      {user.estado === "Activo" ? "Suspender" : "Activar"}
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleEliminarUsuario(user.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}

              {usuariosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    No hay usuarios que coincidan con la búsqueda.
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

export default UsuariosTab;
