import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { crearProductosAPI, editarProductoAPI, obtenerProductosAPI } from "../../../helpers/queries";
import Swal from "sweetalert2";
import ItemProducto from "./ItemProducto";

function ProductoModal({
  show,
  modoProducto,
  productoInicial,
  cerrarModalProducto,
  setProductos,
  productoSeleccionado,
  handleGuardarProducto,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: productoInicial,
  });

  useEffect(() => {
    if (modoProducto === "editar" && productoSeleccionado) {
      setValue("nombre", productoSeleccionado.nombre);
      setValue("categoria", productoSeleccionado.categoria);
      setValue("stock", productoSeleccionado.stock);
      setValue("precio", productoSeleccionado.precio);
      setValue("descripcion", productoSeleccionado.descripcion);
    }

    if (modoProducto === "crear") {
      setValue("nombre", "")
      setValue("categoria", "")
      setValue("stock", "")
      setValue("precio", "")
      setValue("descripcion", "")
    }

  }, [modoProducto, productoSeleccionado, setValue])

  const onSubmit = async (data) => {
    const productoForm = {
      ...data,
      imagenUrl: data.imagenUrl[0]
    }
    if (modoProducto === "crear") {
      const respuesta = await crearProductosAPI(productoForm);
      if (respuesta.status === 201) {
        const respuestaDatos = await obtenerProductosAPI();
        if (respuestaDatos.status === 200) {
          const datos = await respuestaDatos.json();
          setProductos(datos);
        }
        Swal.fire({
          title: "Producto creado exitosamente!",
          icon: "success",
          draggable: true
        })
        cerrarModalProducto();
        reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al crear el producto. Intentelo mas tarde.',
          confirmButtonText: 'Aceptar'
        });
      }

    } else {
      const respuesta = await editarProductoAPI(productoSeleccionado._id, productoForm);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Producto modificado",
          text: `El producto ${productoForm.nombre} se actualizo correctamente`,
          icon: "success",
        });
        const respuestaProductos = await obtenerProductosAPI();
        if (respuestaProductos.status === 200) {
          const productosActualizados = await respuestaProductos.json();
          setProductos(productosActualizados);
          cerrarModalProducto();
        }
      }
    }

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
                  value: 100,
                  message: "Maximo 100 caracteres",
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
              type="file"
              accept="image/*"
              placeholder="URL de la imagen"
              {...register("imagenUrl", {
                validate: (valor) => {
                  if (modoProducto === "crear" && (!valor || valor.length === 0)) {
                    return "La imagen es obligatoria"
                  }
                  return true;
                }
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
