import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";


function Admin() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Panel de Administracion</h1>
          <p>
            Gestioná <strong>productos</strong> y <strong>usuarios</strong> del
            sistema.
          </p>
        </Col>
      </Row>

          <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Productos totales</Card.Title>
              <Card.Text>123</Card.Text>
              <Badge bg="light" text="dark">
                Datos de ejemplo
              </Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Sin stock</Card.Title>
              <Card.Text>8</Card.Text>
              <Badge bg="warning">Revisar</Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Usuarios registrados</Card.Title>
              <Card.Text>45</Card.Text>
              <Badge bg="info">Activos</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>


    </Container>
  );
}

export default Admin;
