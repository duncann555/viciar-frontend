import { Card, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const DetalleProducto = () => {
  return (
    <>
      {/* BREADCRUMB */}
      <Breadcrumb className="py-4 mx-4 px-sm-0 breadcrumb-edit">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Inicio
        </Breadcrumb.Item>

        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Productos
        </Breadcrumb.Item>

        <Breadcrumb.Item active>Cronos: The new dawn</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="container mx-auto g-4 mb-5">
        <Col xs={12} md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-2">
              <img
                src="https://www.zelda.hr/image/cache/catalog/switch-igre/cronos-the-new-dawn-ns2-986x1100w.jpg"
                alt="producto"
                className="img-fluid rounded w-100"
              />
            </Card.Body>
          </Card>
        </Col>

        {/* CARD DE DETALLES*/}
        <Col xs={12} md={6}>
          <Card className="p-3 shadow-sm">
            <Card.Body>
              <Card.Title className="fs-2 my-3">
                Nintendo Switch 2 - Cronos: The new dawn
              </Card.Title>
              <Card.Subtitle className="fs-4 my-3 text-muted">
                Videojuegos
              </Card.Subtitle>

              <hr />

              <Card.Text className="fs-5 my-3 text-muted">
                The new dawn The new dawn The new dawn The new dawn The new dawn
                The new dawn The new dawn The new dawn The new dawn The new dawn
                The new dawn The new dawn
              </Card.Text>

              <hr />

              <Card.Text>
                <span className="fs-3 fw-bold">$112.300</span>
              </Card.Text>

              <hr />

              <div className="d-flex gap-3 align-items-stretch">
                <div className="d-flex align-items-center border rounded px-2 quantity-box h-100 py-1">
                  <button className="btn px-2 py-1"> - </button>
                  <span className="mx-3 fs-5"> 1 </span>
                  <button className="btn px-2 py-1"> + </button>
                </div>

                {/* BOTÓN AGREGAR */}
                <button className="fw-bold btn btn-info px-3 py-2 flex-grow-1 d-flex align-items-center justify-content-center">
                  <i className="bi bi-cart3 me-2"></i> Agregar
                </button>
              </div>

              <hr />
            </Card.Body>
          </Card>

          {/*MÉTODOS DE PAGO*/}
          <div className="p-3 border rounded mt-4 shadow-sm bg-white">
            <h5 className="text-center">Efectivo</h5>
            <div className="border rounded py-2 text-center mb-3">$112.300</div>

            <hr />

            <h5 className="text-center">Transferencia Bancaria</h5>
            <div className="border rounded py-2 text-center mb-3">$112.300</div>
          </div>

          {/*TABLA DE CUOTAS*/}
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
                  <td>$152.728</td>
                  <td>$152.728</td>
                </tr>
                <tr>
                  <td>3 Cuotas</td>
                  <td>$50.909</td>
                  <td>$152.728</td>
                </tr>
                <tr>
                  <td>6 Cuotas</td>
                  <td>$28.636</td>
                  <td>$171.819</td>
                </tr>
                <tr>
                  <td>9 Cuotas</td>
                  <td>$20.214</td>
                  <td>$181.926</td>
                </tr>
                <tr>
                  <td>12 Cuotas</td>
                  <td>$17.126</td>
                  <td>$205.509</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DetalleProducto;
