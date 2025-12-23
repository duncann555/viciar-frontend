import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UsuarioModal from "./UsuarioModal";
import {
  leerUsuarios,
  cambiarEstadoUsuario,
  editarUsuario,
  borrarUsuario,
} from "../../../helpers/queries.js";

function UsuariosTab({ usuarios, actualizarLista }) {
  const [busqueda, setBusqueda] = useState("");

  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};

  const [showModal, setShowModal] = useState(false);
  const [usuarioForm, setUsuarioForm] = useState();
  const [modoUsuario, setModoUsuario] = useState();

  const q = busqueda.toLowerCase().trim();

  const usuariosFiltrados = usuarios.filter((u) => {
    if (!q) return true;

    return (
      (u.nombre || "").toLowerCase().includes(q) ||
      (u.apellido || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.rol || "").toLowerCase().includes(q) ||
      (u.estado || "").toLowerCase().includes(q) ||
      String(u._id).toLowerCase().includes(q)
    );
  });
  // ------------------------------------------

  // Modal (Editar)
  const abrirModalEditar = (usuario) => {
    setModoUsuario("editar");
    setUsuarioForm(usuario);
    setShowModal(true);
  };

  const handleGuardarUsuario = async (data) => {
    if (modoUsuario === "editar" && usuarioForm._id) {
      const resp = await editarUsuario(data, usuarioForm._id);
      if (resp && resp.status === 200) {
        Swal.fire("Actualizado", "Usuario editado correctamente", "success");
        actualizarLista();
        setShowModal(false);
      } else {
        Swal.fire("Error", "No se pudo actualizar el usuario", "error");
      }
    }
  };

  const handleSuspender = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === "Activo" ? "Suspendido" : "Activo";
    const resp = await cambiarEstadoUsuario(id, nuevoEstado);
    if (resp && resp.status === 200) {
      actualizarLista();
    }
  };

  const handleEliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await borrarUsuario(id);
        if (resp && resp.status === 200) {
          Swal.fire("Eliminado", "El usuario fue eliminado", "success");
          actualizarLista();
        }
      }
    });
  };

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
              placeholder="Buscar por nombre, email, rol, estado..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <Button className="btn-primary" onClick={() => { }}>
              Buscar
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="fw-semibold text-primary">
            Listado de usuarios
          </Card.Title>
          <Table responsive striped hover className="mt-3">
            <thead className="table-primary text-center">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {usuariosFiltrados.map((user) => {

                const esMismoUsuario = user._id === usuarioLogueado._id;

                return (
                  <tr key={user._id}>
                    <td>
                      {user.nombre} {user.apellido}
                      {esMismoUsuario && <span className="text-muted ms-2 fst-italic">(Tú)</span>}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <Badge
                        bg={user.rol === "Administrador" ? "dark" : "secondary"}
                      >
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
                        onClick={() => abrirModalEditar(user)}
                      >
                        Editar
                      </Button>
                      {!esMismoUsuario && (
                        <>
                          <Button
                            variant={
                              user.estado === "Activo"
                                ? "outline-warning"
                                : "outline-success"
                            }
                            size="sm"
                            className="me-2"
                            onClick={() => handleSuspender(user._id, user.estado)}
                          >
                            {user.estado === "Activo" ? "Suspender" : "Activar"}
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleEliminar(user._id)}
                          >
                            Eliminar
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}

              {usuariosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-muted pt-3">
                    No se encontraron usuarios
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <UsuarioModal
        show={showModal}
        modoUsuario={modoUsuario}
        usuarioForm={usuarioForm}
        cerrarModalUsuario={() => setShowModal(false)}
        handleGuardarUsuario={handleGuardarUsuario}
      />
    </>
  );
}

export default UsuariosTab;