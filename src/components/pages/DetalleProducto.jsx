import { useEffect, useMemo, useState } from "react";
import { Card, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { agregarAlCarrito } from "../../helpers/queries.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const DetalleProducto = () => {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const traer = async () => {
      try {
        setLoading(true);
        setError("");

        const resp = await fetch(`${API_URL}/api/productos/${id}`);
        if (!resp.ok) throw new Error("No pude cargar el producto.");

        const data = await resp.json();
        setProducto(data?.producto || data);
      } catch (e) {
        setError(e.message || "Error cargando el producto.");
      } finally {
        setLoading(false);
      }
    };

    traer();
  }, [id]);

  const sumar = () => setCantidad((c) => c + 1);
  const restar = () => setCantidad((c) => (c > 1 ? c - 1 : 1));

  const agregar = () => {
    for (let i = 0; i < cantidad; i++) agregarAlCarrito(id);
  };

  const precioUnitario = useMemo(
    () => Number(producto?.precio) || 0,
    [producto]
  );

  const total = useMemo(
    () => precioUnitario * cantidad,
    [precioUnitario, cantidad]
  );

  // Si querés, podés hacer descuentos/recargos acá.
  const efectivo = total; // mismo precio
  const transferencia = total; // mismo precio

  if (loading) return <p className="text-center mt-4 text-muted">Cargando...</p>;
  if (error) return <p className="text-center mt-4 text-danger">{error}</p>;
  if (!producto) return null;

  return (
    <>
      {/* BREADCRUMB */}
      <Breadcrumb className="py-4 mx-4 px-sm-0 breadcrumb-edit">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Inicio
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{producto.nombre}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="container mx-auto g-4 mb-5">
        {/* IMAGEN */}
        <Col xs={12} md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-2">
              <img
                src={producto.imagenUrl}
                alt={producto.nombre}
                className="img-fluid rounded w-100"
              />
            </Card.Body>
          </Card>
        </Col>

        {/* DETALLES */}
        <Col xs={12} md={6}>
          <Card className="p-3 shadow-sm">
            <Card.Body>
              <Card.Title className="fs-2 my-3">{producto.nombre}</Card.Title>
              <Card.Subtitle className="fs-4 my-3 text-muted">
                {producto.categoria}
              </Card.Subtitle>

              <hr />

              <Card.Text className="fs-5 my-3 text-muted">
                {producto.descripcion}
              </Card.Text>

              <hr />

              <Card.Text>
                <span className="fs-3 fw-bold">
                  ${precioUnitario.toLocaleString("es-AR")}
                </span>
                <span className="text-muted ms-2">
                  (x {cantidad} = ${total.toLocaleString("es-AR")})
                </span>
              </Card.Text>

              <hr />

              <div className="d-flex gap-3 align-items-stretch">
                <div className="d-flex align-items-center border rounded px-2 quantity-box h-100 py-1">
                  <button type="button" className="btn px-2 py-1" onClick={restar}>
                    -
                  </button>
                  <span className="mx-3 fs-5">{cantidad}</span>
                  <button type="button" className="btn px-2 py-1" onClick={sumar}>
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={agregar}
                  className="fw-bold btn btn-info px-3 py-2 flex-grow-1 d-flex align-items-center justify-content-center"
                >
                  <i className="bi bi-cart3 me-2"></i> Agregar
                </button>
              </div>

              <hr />
            </Card.Body>
          </Card>

          {/* MÉTODOS DE PAGO */}
          <div className="p-3 border rounded mt-4 shadow-sm bg-white">
            <h5 className="text-center">Efectivo</h5>
            <div className="border rounded py-2 text-center mb-3">
              ${efectivo.toLocaleString("es-AR")}
            </div>

            <hr />

            <h5 className="text-center">Transferencia Bancaria</h5>
            <div className="border rounded py-2 text-center mb-3">
              ${transferencia.toLocaleString("es-AR")}
            </div>
          </div>

          {/* TABLA DE CUOTAS (ejemplo fijo) */}
          <div className="p-3 border rounded mt-4 shadow-sm bg-white">
            <h5 className="text-center mb-3">Tarjeta de Crédito (en cuotas)</h5>

            <hr />

            <table className="table text-center align-middle">
              <thead>
                <tr>
                  <th>Cuotas</th>
                  <th>Precio cuota</th>
                  <th>Precio final</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 Cuota</td>
                  <td>${(total / 1).toLocaleString("es-AR")}</td>
                  <td>${(total).toLocaleString("es-AR")}</td>
                </tr>
                <tr>
                  <td>3 Cuotas</td>
                  <td>${(total / 3).toLocaleString("es-AR")}</td>
                  <td>${(total).toLocaleString("es-AR")}</td>
                </tr>
                <tr>
                  <td>6 Cuotas</td>
                  <td>${(total / 6).toLocaleString("es-AR")}</td>
                  <td>${(total).toLocaleString("es-AR")}</td>
                </tr>
                <tr>
                  <td>9 Cuotas</td>
                  <td>${(total / 9).toLocaleString("es-AR")}</td>
                  <td>${(total).toLocaleString("es-AR")}</td>
                </tr>
                <tr>
                  <td>12 Cuotas</td>
                  <td>${(total / 12).toLocaleString("es-AR")}</td>
                  <td>${(total).toLocaleString("es-AR")}</td>
                </tr>
              </tbody>
            </table>

            <small className="text-muted d-block text-center">
              * Las cuotas son de ejemplo (sin interés). Si querés, lo hacemos con recargo real.
            </small>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DetalleProducto;
