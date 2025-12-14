import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router";

const CardProducto = ({ producto }) => {
  const { id } = producto;

  return (
      <Col sm={6} md={4} lg={3} className="g-3">
      <Card className="h-100 shadow">
        <div className="contenedorImg">
          <Card.Img
            variant="top"
            src={producto.imagenUrl}
            alt={producto.nombre}
            className="imgCard"
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-5">{producto.nombre}</Card.Title>
          <Card.Text className="mt-auto">
            <span className="text-muted small">{producto.categoria}</span>
            <br className="mb-2" />
            <span className="fw-bold fs-5">${producto.precio.toLocaleString()}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end bg-white border-top-0 mt-auto">
          <Button variant="success" size="sm" className="me-2">
            <i className="bi bi-cart-plus-fill"></i> Agregar
          </Button>
          <Link
            to={`/detalleproducto/${id}`}
            className="btn btn-primary btn-sm"
          >
            Ver más
          </Link>
        </Card.Footer>
      </Card></Col>
  );
};

export default CardProducto;
