import React, { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../../styles/carrito.css";
import ItemProducto from "./ItemProducto";
import { useForm } from "react-hook-form";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const CART_KEY = "carrito";

const leerCarritoLS = () => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const guardarCarritoLS = (carrito) => {
  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
};

const Carrito = () => {
  const [paso, SetPaso] = useState(1);

  // ✅ carrito desde localStorage
  const [carrito, setCarrito] = useState(() => leerCarritoLS());

  // ✅ productos desde backend
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [errorProductos, setErrorProductos] = useState("");

  const siguienteFormulario = () => SetPaso((p) => p + 1);
  const volverFormulario = () => SetPaso((p) => p - 1);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  // ✅ persistir carrito en localStorage
  useEffect(() => {
    guardarCarritoLS(carrito);
  }, [carrito]);

  // ✅ traer productos del backend
  useEffect(() => {
    const traerProductos = async () => {
      try {
        setLoadingProductos(true);
        setErrorProductos("");

        const resp = await fetch(`${API_URL}/api/productos`);
        if (!resp.ok) throw new Error("No pude traer productos del backend.");

        const data = await resp.json();
        setProductos(Array.isArray(data) ? data : data?.productos || []);
      } catch (e) {
        setErrorProductos(e.message || "Error trayendo productos.");
      } finally {
        setLoadingProductos(false);
      }
    };

    traerProductos();
  }, []);

  // ✅ eliminar item (real)
  const eliminarItem = (idProducto) => {
    setCarrito((prev) =>
      prev.filter((item) => String(item.idProducto) !== String(idProducto))
    );
  };

  // ✅ cambiar cantidad (real)
  const cambiarCantidad = (idProducto, nuevaCantidad) => {
    const cant = Math.max(1, Number(nuevaCantidad || 1));

    setCarrito((prev) =>
      prev.map((item) =>
        String(item.idProducto) === String(idProducto)
          ? { ...item, cantidad: cant }
          : item
      )
    );
  };

  // Mapa rápido: id -> producto
  const productosById = useMemo(() => {
    const map = new Map();
    productos.forEach((p) => {
      const id = String(p._id ?? p.id);
      map.set(id, p);
    });
    return map;
  }, [productos]);

  // Armar items del resumen usando carrito (LS) + productos (backend)
  const itemsDetallados = useMemo(() => {
    return carrito
      .map((item) => {
        const id = String(item.idProducto);
        const p = productosById.get(id);
        if (!p) return null;

        return {
          id,
          cantidad: item.cantidad ?? 1,
          nombre: p.nombre,
          precio: Number(p.precio) || 0,
          // por si tu backend usa imagenUrl (vos la usás en CardProducto)
          imagen: p.imagenUrl || p.imagen,
        };
      })
      .filter(Boolean);
  }, [carrito, productosById]);

  const total = useMemo(() => {
    return itemsDetallados.reduce((acc, it) => acc + it.precio * it.cantidad, 0);
  }, [itemsDetallados]);

  const postValidaciones = (data) => {
    const pedido = {
      cliente: data,
      items: itemsDetallados.map((it) => ({
        idProducto: it.id,
        cantidad: it.cantidad,
        precioUnitario: it.precio,
      })),
      total,
    };

    console.log("Pedido listo para enviar:", pedido);
    reset();
  };

  return (
    <section className="container-fluid mt-3">
      <Form onSubmit={handleSubmit(postValidaciones)}>
        <div className="row">
          {/* Columna para tomar los datos del usuario */}
          <div className="col-12 col-md-6">
            {paso === 1 ? (
              <div className="card mb-4 shadow">
                <div className="card-body">
                  <h5>Datos del cliente</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ej: Juan"
                          {...register("nombre", {
                            required: "El nombre es un dato obligatorio",
                            minLength: { value: 2, message: "Mínimo 2 caracteres" },
                            maxLength: { value: 70, message: "Máximo 70 caracteres" },
                          })}
                          onChange={() => clearErrors("nombre")}
                        />
                        <Form.Text className="text-danger">
                          {errors.nombre?.message}
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ej: Perez"
                          {...register("apellido", {
                            required: "El apellido es un dato obligatorio",
                            minLength: { value: 2, message: "Mínimo 2 caracteres" },
                            maxLength: { value: 30, message: "Máximo 30 caracteres" },
                          })}
                          onChange={() => clearErrors("apellido")}
                        />
                        <Form.Text className="text-danger">
                          {errors.apellido?.message}
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ej: 45785688"
                          {...register("DNI", {
                            required: "El DNI es un dato obligatorio",
                            maxLength: { value: 8, message: "Debe contener 8 dígitos" },
                          })}
                        />
                        <Form.Text className="text-danger">
                          {errors.DNI?.message}
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Ej: juanperez@gmail.com"
                          {...register("email", {
                            required: "El email es un dato obligatorio",
                            pattern: {
                              value:
                                /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                              message: "El email ingresado no es válido",
                            },
                          })}
                          onChange={() => clearErrors("email")}
                        />
                        <Form.Text className="text-danger">
                          {errors.email?.message}
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ej: 3863457824"
                          {...register("telefono", {
                            required: "El telefono es un dato obligatorio",
                            minLength: { value: 8, message: "Mínimo 8 caracteres" },
                            maxLength: { value: 10, message: "Máximo 10 caracteres" },
                          })}
                          onChange={() => clearErrors("telefono")}
                        />
                        <Form.Text className="text-danger">
                          {errors.telefono?.message}
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <div className="col-12 d-flex justify-content-end">
                      <Button
                        type="button"
                        className="btn btn-navegacion"
                        onClick={siguienteFormulario}
                      >
                        Siguiente <i className="bi bi-arrow-right ms-1"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {paso === 2 ? (
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5>Datos de envio</h5>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Provincia</Form.Label>
                        <Form.Select
                          {...register("provincia", {
                            required: "La provincia es un dato obligatorio",
                          })}
                          onChange={() => clearErrors("provincia")}
                        >
                          <option value="">Seleccione una provincia</option>
                          <option value="Buenos Aires">Buenos Aires</option>
                          <option value="Cordoba">Cordoba</option>
                          <option value="Neuquen">Neuquen</option>
                          <option value="Tucuman">Tucuman</option>
                          <option value="Salta">Salta</option>
                        </Form.Select>
                        <Form.Text className="text-danger">
                          {errors.provincia?.message}
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="ej: Concepcion"
                          {...register("ciudad", {
                            required: "La ciudad es un dato obligatorio",
                            minLength: { value: 4, message: "Mínimo 4 caracteres" },
                            maxLength: { value: 50, message: "Máximo 50 caracteres" },
                          })}
                          onChange={() => clearErrors("ciudad")}
                        />
                        <Form.Text className="text-danger">
                          {errors.ciudad?.message}
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Domicilio</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="ej: Calle Elm Street"
                          {...register("domicilio", {
                            required: "El domicilio es un dato obligatorio",
                            minLength: { value: 6, message: "Mínimo 6 caracteres" },
                            maxLength: { value: 30, message: "Máximo 30 caracteres" },
                          })}
                          onChange={() => clearErrors("domicilio")}
                        />
                        <Form.Text className="text-danger">
                          {errors.domicilio?.message}
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Codigo Postal</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="ej: 7895"
                          {...register("codigopostal", {
                            required: "El codigo postal es un dato obligatorio",
                            minLength: { value: 4, message: "Mínimo 4 caracteres" },
                            maxLength: { value: 8, message: "Máximo 8 caracteres" },
                          })}
                          onChange={() => clearErrors("codigopostal")}
                        />
                        <Form.Text className="text-danger">
                          {errors.codigopostal?.message}
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <div className="col-12 mt-2 d-flex justify-content-between">
                      <Button
                        type="button"
                        className="btn btn-navegacion mt-2 mb-1"
                        onClick={volverFormulario}
                      >
                        <i className="bi bi-arrow-left me-1"></i>Atrás
                      </Button>
                      <Button
                        type="button"
                        className="btn btn-navegacion mt-2 mb-1"
                        onClick={siguienteFormulario}
                      >
                        Siguiente <i className="bi bi-arrow-right ms-1"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {paso === 3 ? (
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5>Metodo de pago</h5>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Tarjeta</Form.Label>
                        <Form.Select
                          {...register("tarjeta", {
                            required: "Este campo es obligatorio",
                          })}
                          onChange={() => clearErrors("tarjeta")}
                        >
                          <option value="">Seleccione su tarjeta</option>
                          <option value="MasterCard">MasterCard</option>
                          <option value="Visa">Visa</option>
                          <option value="Naranja">Naranja</option>
                        </Form.Select>
                        <Form.Text className="text-danger">
                          {errors.tarjeta?.message}
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Numero Tarjeta</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ej: 7852 4556 7893"
                          {...register("numeroTarjeta", {
                            required: "Este campo es obligatorio",
                            minLength: { value: 16, message: "Mínimo 16 caracteres" },
                            maxLength: { value: 20, message: "Máximo 20 caracteres" },
                          })}
                          onChange={() => clearErrors("numeroTarjeta")}
                        />
                        <Form.Text className="text-danger">
                          {errors.numeroTarjeta?.message}
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Cuotas</Form.Label>
                        <Form.Select
                          {...register("cuotas", {
                            required: "Por favor seleccione una opcion",
                          })}
                          onChange={() => clearErrors("cuotas")}
                        >
                          <option value="">Cantidad a pagar</option>
                          <option value="1">Pago unico</option>
                          <option value="3">3 Cuotas sin interes</option>
                          <option value="6">6 Cuotas sin interes</option>
                          <option value="12">12 Cuotas sin interes</option>
                        </Form.Select>
                        <Form.Text className="text-danger">
                          {errors.cuotas?.message}
                        </Form.Text>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="col-md-6 d-flex justify-content-start">
                    <Button
                      type="button"
                      className="btn btn-navegacion"
                      onClick={volverFormulario}
                    >
                      <i className="bi bi-arrow-left me-1"></i>Atrás
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Resumen */}
          <div className="col-12 col-md-6">
            <div className="card mb-3 shadow">
              <div className="card-body">
                <h4 className="text-center">Resumen del pedido</h4>

                {loadingProductos ? (
                  <p className="text-center text-muted mt-3">Cargando productos...</p>
                ) : errorProductos ? (
                  <p className="text-center text-danger mt-3">{errorProductos}</p>
                ) : itemsDetallados.length === 0 ? (
                  <p className="text-center text-muted mt-3">
                    Tu carrito está vacío. (No muerde, pero tampoco compra solo 😄)
                  </p>
                ) : (
                  itemsDetallados.map((it) => (
                    <ItemProducto
                      key={it.id}
                      id={it.id}
                      nombre={it.nombre}
                      precio={it.precio}
                      imagen={it.imagen}
                      cantidad={it.cantidad}
                      onEliminar={eliminarItem}
                      onCambiarCantidad={cambiarCantidad}
                    />
                  ))
                )}

                <div className="d-flex flex-column justify-content-between align-items-center mt-3 py-2 me-2">
                  <p className="text-center mt-2 fs-5 ms-2">
                    <strong>Total Pedido:</strong> ${total.toLocaleString("es-AR")}
                  </p>

                  <Button
                    type="submit"
                    className="btn btn-navegacion w-100 btn-confirmar"
                    disabled={itemsDetallados.length === 0}
                  >
                    Confirmar Pedido
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Form>
    </section>
  );
};

export default Carrito;
