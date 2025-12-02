import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import "../../styles/admin.css";


function Admin() {


  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold text-primary">Panel de Administración</h1>
          <p className="text-muted">
            Gestioná <strong>productos</strong> y <strong>usuarios</strong> del
            sistema.
          </p>
        </Col>
      </Row>

      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="fw-semibold">Productos totales</Card.Title>
              <Card.Text className="fs-3 fw-bold text-primary">123</Card.Text>
              <Badge bg="light" text="dark">
                Datos de ejemplo
              </Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="fw-semibold">Sin stock</Card.Title>
              <Card.Text className="fs-3 fw-bold text-warning">8</Card.Text>
              <Badge bg="warning">Revisar</Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="fw-semibold">
                Usuarios registrados
              </Card.Title>
              <Card.Text className="fs-3 fw-bold text-info">45</Card.Text>
              <Badge bg="info">Activos</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="productos" className="admin-tabs mb-3">
        <Tab eventKey="productos" title="Productos">
          <Row className="align-items-center mb-3 g-2">
            <Col md={4}>
              <Button
                className="btn-admin-primary w-100"
                onClick={() => setMostrarProductoModal(true)}
              >
                + Agregar producto
              </Button>
            </Col>

            <Col md={8}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Buscar producto por nombre o categoría..."
                />
                <Button className="btn-admin-primary">Buscar</Button>
              </InputGroup>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="usuarios" title="Usuarios">
          <div className="tab-content-wrapper">
            <Row className="align-items-center mb-3 g-2">
              <Col md={4}>
                <Button
                  className="btn-admin-secondary w-100"
                  onClick={() => setMostrarUsuarioModal(true)}
                >
                  + Agregar usuario
                </Button>
              </Col>

              <Col md={8}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Buscar usuario por nombre o email..."
                  />
                  <Button variant="outline-secondary">Buscar</Button>
                </InputGroup>
              </Col>
            </Row>

            
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Admin;
