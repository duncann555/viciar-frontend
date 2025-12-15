import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { agregarAlCarrito } from "../../../helpers/queries.js";

const CardProducto = ({ producto }) => {
  const id = producto._id || producto.id;

  return (
    <Col xs={6} md={4} lg={3} className="g-3">
      <Card className="h-100 shadow position-relative">
        <div className="contenedorImg">
          <Card.Img
            variant="top"
            src={producto.imagenUrl}
            alt={producto.nombre}
            className="imgCard"
          />
        </div>

        <Card.Body className="d-flex flex-column">
          {/* ✅ hace que clickeando el body vaya al detalle */}
          <Link to={`/detalleproducto/${id}`} className="stretched-link" />

          <Card.Title className="fs-5">{producto.nombre}</Card.Title>
          <Card.Text className="mt-auto">
            <span className="text-muted small">{producto.categoria}</span>
            <br />
            <span className="fw-bold fs-5">
              ${producto.precio.toLocaleString("es-AR")}
            </span>
          </Card.Text>
        </Card.Body>

        <Card.Footer className="text-end bg-white border-top-0 mt-auto btn-card position-relative">
          {/* ✅ ojo: stretched-link tapa clicks; por eso el footer queda position-relative */}
          <Button
            variant="success"
            size="sm"
            className="me-2"
            onClick={() => agregarAlCarrito(id)}
          >
            <i className="bi bi-cart-plus-fill"></i> Agregar
          </Button>

          <Link to={`/detalleproducto/${id}`} className="btn btn-primary btn-sm">
            Ver más
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;
