import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

function UsuarioModal({
  show,
  modoUsuario,
  usuarioForm,
  handleChangeUsuario,
  cerrarModalUsuario,
  handleGuardarUsuario,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  // Acá NO usamos "data" porque vos ya tenés usuarioForm en el padre
  const onSubmit = () => {
    handleGuardarUsuario(data);
  };

  return (
    <Modal show={show} onHide={cerrarModalUsuario} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {modoUsuario === "crear" ? "Agregar usuario" : "Editar usuario"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="formUsuario" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Juan"
              value={usuarioForm.nombre}
              isInvalid={!!errors.nombre}
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 2,
                  message: "Mínimo 2 caracteres",
                },
                onChange: handleChangeUsuario,
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Pérez"
              value={usuarioForm.apellido}
              isInvalid={!!errors.apellido}
              {...register("apellido", {
                required: "El apellido es obligatorio",
                minLength: {
                  value: 2,
                  message: "Mínimo 2 caracteres",
                },
                onChange: handleChangeUsuario,
              })}
            />  
            <Form.Control.Feedback type="invalid">
              {errors.apellido?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@correo.com"
              value={usuarioForm.email}
              isInvalid={!!errors.email}
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Ingresá un email válido",
                },
                onChange: handleChangeUsuario,
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              value={usuarioForm.rol}
              isInvalid={!!errors.rol}
              {...register("rol", {
                required: "Seleccioná un rol",
                onChange: handleChangeUsuario,
              })}
            >
              <option value="">Seleccionar rol</option>
              <option value="admin">Administrador</option>
              <option value="usuario">Usuario</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.rol?.message}
            </Form.Control.Feedback>
          </Form.Group>

          
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModalUsuario}>
          Cancelar
        </Button>
        <Button className="btn-admin-primary" type="submit" form="formUsuario">
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UsuarioModal;
