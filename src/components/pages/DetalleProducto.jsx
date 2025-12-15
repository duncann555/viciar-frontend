import { useEffect, useState } from "react";
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
        setProducto(data?.producto || data); // por si tu backend devuelve {producto: {...}}
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
    // agrega N unidades usando tu helper actual
    for (let i = 0; i < cantidad; i++) agregarAlCarrito(id);
  };

  if (loading) return <p className="text-center mt-4 text-muted">Cargando...</p>;
  if (error) return <p className="text-center mt-4 text-danger">{error}</p>;
  if (!producto) return null;

  return (
    <>
      <Breadcrumb className="py-4 mx-4 px-sm-0 breadcrumb-edit">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Inicio
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{producto.nombre}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="container mx-auto g-4 mb-5">
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
                  ${Number(producto.precio).toLocaleString("es-AR")}
                </span>
              </Card.Text>

              <hr />

              <div className="d-flex gap-3 align-items-stretch">
                <div className="d-flex align-items-center border rounded px-2 quantity-box h-100 py-1">
                  <button className="btn px-2 py-1" onClick={restar}> - </button>
                  <span className="mx-3 fs-5">{cantidad}</span>
                  <button className="btn px-2 py-1" onClick={sumar}> + </button>
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
        </Col>
      </Row>
    </>
  );
};

export default DetalleProducto;
