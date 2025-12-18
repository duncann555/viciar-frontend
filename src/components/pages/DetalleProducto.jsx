import { Card, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { obtenerProductosIdAPI, agregarAlCarrito } from "../../helpers/queries.js";
import { useEffect, useState } from "react";

const DetalleProducto = () => {
  const [producto, setProducto] = useState(null);
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);

  const handleSumar = () => setCantidad(cantidad + 1);
  const handleRestar = () => cantidad > 1 && setCantidad(cantidad - 1);
  
  useEffect(() => {
    buscarProducto();
  }, [id]);

  const buscarProducto = async () => {
    const respuesta = await obtenerProductosIdAPI(id);
    if (respuesta.status === 200) {
      const productoEncontrado = await respuesta.json();
      setProducto(productoEncontrado);
    } else {
      alert("Ocurrió un error");
    }
  };

  if (!producto) {
    return (
      <div className="text-center py-5">
        <h3>Cargando producto...</h3>
      </div>
    );
  }

  const precioEfectivo = producto.precio;
  const precioTransferencia = producto.precio * 1.1;
  const cuotasDefinidas = [1, 3, 6, 12];



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

        {/* CARD DE DETALLES*/}
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
                  ${producto.precio?.toLocaleString()}{" "}
                </span>
              </Card.Text>

              <hr />

              <div className="d-flex gap-3 align-items-stretch">
                <div className="d-flex align-items-center border rounded px-2 quantity-box h-100 py-1">
                  <button className="btn px-2 py-1" onClick={handleRestar}>
                    {" "}
                    -{" "}
                  </button>
                  <span className="mx-3 fs-5"> {cantidad} </span>
                  <button className="btn px-2 py-1" onClick={handleSumar}>
                    {" "}
                    +{" "}
                  </button>
                </div>

                {/* BOTÓN AGREGAR */}
                <button className="fw-bold btn btn-info px-3 py-2 flex-grow-1 d-flex align-items-center justify-content-center" onClick={() => agregarAlCarrito(producto, cantidad)}>
                  <i className="bi bi-cart3 me-2"></i> Agregar
                </button>
              </div>

              <hr />
            </Card.Body>
          </Card>

          {/*MÉTODOS DE PAGO*/}
          <div className="p-3 border rounded mt-4 shadow-sm bg-white">
            <h5 className="text-center">Efectivo</h5>
            <div className="border rounded py-2 text-center mb-3">
              ${precioEfectivo?.toLocaleString()}
            </div>

            <hr />

            <h5 className="text-center">Transferencia Bancaria</h5>
            <div className="border rounded py-2 text-center mb-3">
              $
              {precioTransferencia?.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </div>
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
                {cuotasDefinidas.map((cuota) => (
                  <tr key={cuota}>
                    <td>
                      {cuota} {cuota === 1 ? "Cuota" : "Cuotas"}
                    </td>
                    <td className="fw-bold">
                      $
                      {(producto.precio / cuota).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td>${producto.precio?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DetalleProducto;
