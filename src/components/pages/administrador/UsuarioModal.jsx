import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

function UsuarioModal({
  show,
  modoUsuario,
  usuarioForm,
  cerrarModalUsuario,
  handleGuardarUsuario,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (modoUsuario === "editar" && usuarioForm) {
      setValue("nombre", usuarioForm.nombre);
      setValue("apellido", usuarioForm.apellido)
      setValue("dni", usuarioForm.dni)
      setValue("telefono", usuarioForm.telefono)
      setValue("email", usuarioForm.email)
      setValue("rol", usuarioForm.rol)
    }
  }, [modoUsuario, usuarioForm, setValue])

  const onSubmit = (data) => {
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
              isInvalid={!!errors.nombre}
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 2,
                  message: "Mínimo 2 caracteres",
                },
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
              isInvalid={!!errors.apellido}
              {...register("apellido", {
                required: "El apellido es obligatorio",
                minLength: {
                  value: 2,
                  message: "Mínimo 2 caracteres",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.apellido?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 12345678"
              isInvalid={!!errors.dni}
              {...register("dni", {
                required: "El DNI es obligatorio",
                pattern: {
                  value: /^\d{7,8}$/,
                  message: "Debe tener 7 u 8 dígitos"
                }
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dni?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 381..."
              isInvalid={!!errors.telefono}
              {...register("telefono", {
                required: "El teléfono es obligatorio",
                minLength: { value: 8, message: "Mínimo 8 números" }
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.telefono?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@correo.com"
              isInvalid={!!errors.email}
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Ingresá un email válido",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              isInvalid={!!errors.rol}
              {...register("rol", {
                required: "Seleccioná un rol",
              })}
            >
              <option value="Administrador">Administrador</option>
              <option value="Usuario">Usuario</option>
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