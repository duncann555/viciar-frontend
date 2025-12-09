import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function ProductoModal({
  show,
  modoProducto,
  productoInicial,
  cerrarModalProducto,
  handleGuardarProducto,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: productoInicial,
  });

  useEffect(() => {
    reset(productoInicial);
  }, [productoInicial, reset]);

  const onSubmit = (data) => {
    handleGuardarProducto(data);
  };

  return (
    <Modal show={show} onHide={cerrarModalProducto} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {modoProducto === "crear" ? "Agregar producto" : "Editar producto"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: PS5 Slim"
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "Maximo 30 caracteres",
                },
              })}
            />
            {errors.nombre && (
              <small className="text-danger">{errors.nombre.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              {...register("categoria", {
                required: "Seleccioná una categoría",
              })}
            >
              <option value="">Seleccioná una categoría</option>
              <option value="Juegos de PC">Juegos de PC</option>
              <option value="Juegos de PlayStation">
                Juegos de PlayStation
              </option>
              <option value="Juegos de Xbox">Juegos de Xbox</option>
              <option value="Consolas">Consolas</option>
              <option value="Accesorios">Accesorios</option>
            </Form.Select>
            {errors.categoria && (
              <small className="text-danger">{errors.categoria.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cantidad disponible"
              min="0"
              {...register("stock", {
                required: "El stock es obligatorio",
                min: { value: 0, message: "No puede ser negativo" },
              })}
            />
            {errors.stock && (
              <small className="text-danger">{errors.stock.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Precio en ARS"
              min="1"
              {...register("precio", {
                required: "El precio es obligatorio",
                min: {
                  value: 1,
                  message: "El precio debe ser mayor a 0",
                },
              })}
            />
            {errors.precio && (
              <small className="text-danger">{errors.precio.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de la imagen</Form.Label>
            <Form.Control
              type="url"
              placeholder="URL de la imagen"
              {...register("imagenUrl", {
                required: "La imagen es obligatoria",
                pattern: {
                  value: /^(https?:\/\/).+/i,
                  message:
                    "Ingresá una URL válida que comience con http o https",
                },
              })}
            />
            {errors.imagenUrl && (
              <small className="text-danger">{errors.imagenUrl.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("descripcion", {
                required: "La descripción es obligatoria",
                minLength: {
                  value: 10,
                  message: "Mínimo 10 caracteres",
                },
              })}
            />
            {errors.descripcion && (
              <small className="text-danger">
                {errors.descripcion.message}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de último control</Form.Label>
            <Form.Control type="date" {...register("fechaControl")} />
            {errors.fechaControl && (
              <small className="text-danger">
                {errors.fechaControl.message}
              </small>
            )}
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={cerrarModalProducto}>
              Cancelar
            </Button>
            <Button className="btn-admin-primary" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ProductoModal;
