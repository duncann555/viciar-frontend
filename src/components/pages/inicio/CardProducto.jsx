import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router";

const CardProducto = () => {
  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100">
        <div>
          <img
            className="card-img-top-nueva"
          />
        </div>
        <Card.Body>
          <Card.Title>Nombre del producto</Card.Title>
          <Card.Text>
            descripcion
            <br className="mb-2" />
            <span className="fw-bold">Precio: $</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button variant="success" className="me-2">
            <i className="bi bi-cart-plus-fill"></i> Agregar
          </Button>
          <Link className="me-2 btn btn-primary">
            Ver más
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;