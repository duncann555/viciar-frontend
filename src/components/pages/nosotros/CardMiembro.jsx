import { Card, Col, Button } from "react-bootstrap";
import { useState } from "react";
import '../../../styles/nosotros.css'

export const CardMiembro = ({ nombre, imagen, github, linkedin }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <Col md={6} lg={4} className="mb-3">
      <Card className="h-100 card-miembro">
        <div className="d-flex justify-content-center align-content-center">
          <img
            src={error ? "URL_DE_IMAGEN_DE_PLACEHOLDER" : imagen}
            alt={nombre}
            className="card-img-miembro"
            onError={handleError}
            loading="lazy"
          />
        </div>
        <Card.Body className="card-header w-100">
          <div>
          <Card.Title className="text-center card-nombre">{nombre}</Card.Title>
          </div>
          <div className="card-redes">
            <a href={github} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="btn-red">
                <i className="bi bi-github"></i>
              </Button>
            </a>
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="btn-red">
                  <i className="bi bi-linkedin"></i>
                </Button>
              </a>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
