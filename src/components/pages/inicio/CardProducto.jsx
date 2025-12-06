import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router";

const CardProducto = ({ producto }) => {
  const { id, nombreProducto, precio, imagen, categoria } = producto;

  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100 shadow">
        <div className="contenedorImg">
          <Card.Img
            variant="top"
            src={imagen}
            alt={nombreProducto}
            className="imgCard"
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-5">{nombreProducto}</Card.Title>
          <Card.Text className="mt-auto">
            <span className="text-muted small">{categoria}</span>
            <br className="mb-2" />
            <span className="fw-bold fs-5">${precio.toLocaleString()}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end bg-white border-top-0">
          <Button variant="success" size="sm" className="me-2">
            <i className="bi bi-cart-plus-fill"></i> Agregar
          </Button>
          <Link className="btn btn-primary btn-sm">
            Ver más
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;
