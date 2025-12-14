import CarruselPrincipal from "./inicio/CarruselPrincipal.jsx";
import CardProducto from "./inicio/CardProducto.jsx";
import CarruselOfertas from "./inicio/CarruselOfertas.jsx";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

const Inicio = () => {

  const [productos, setProductos] = useState([]);
  
  const categorias = [
    { id: 1, nombre: "Juegos de PC" }, 
    { id: 2, nombre: "Juegos de PlayStation" },
    { id: 3, nombre: "Juegos de Xbox" },
    { id: 4, nombre: "Juegos de Nintendo" },
    { id: 5, nombre: "Accesorios" },
    { id: 6, nombre: "Consolas" },
  ];

  useEffect(() => {
    consultarAPI();
  }, []);

  const consultarAPI = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/productos");
      
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        setProductos(datos);
      } else {
        console.error("Error al cargar productos");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cat1 = categorias[0];
  const productosSeccion1 = productos.filter(
    (p) => p.categoria === cat1.nombre
  );

  const cat2 = categorias[1];
  const productosSeccion2 = productos.filter(
    (p) => p.categoria === cat2.nombre
  );
  const cat3 = categorias[2];
  const productosSeccion3 = productos.filter(
    (p) => p.categoria === cat3.nombre
  );
  const cat4 = categorias[3];
  const productosSeccion4 = productos.filter(
    (p) => p.categoria === cat4.nombre
  );
  const cat5 = categorias[4];
  const productosSeccion5 = productos.filter(
    (p) => p.categoria === cat5.nombre
  );
  const cat6 = categorias[5];
  const productosSeccion6 = productos.filter(
    (p) => p.categoria === cat6.nombre
  );

  
  return (
    <div>
      <CarruselPrincipal />
      <Container>
        <div className="mb-5">
          <h1 className="py-3 text-center fw-bolder text-primary-emphasis">
            Bienvenidos a ViciAR
          </h1>
          <h5 className="fw-medium text-center">
            Donde no vendemos simples juegos. Vendemos las 3 de la mañana con
            amigos y esa sensación de gloria
            absoluta. <br />Tu próxima obsesión está a un clic de distancia.
          </h5>
        </div>
        <Row className="mb-4">
          <Col sm={12}>
            <div className="bg-dark text-white py-2 px shadow w-100 d-flex align-items-center justify-content-center contenedorCat">
              <h2 className="m-0 fw-bold tituloCat">{cat1.nombre}</h2>
            </div>
          </Col>
        </Row>
        <Row>
          {productosSeccion1.length > 0 ? (
            productosSeccion1.map((prod) => (
              <CardProducto key={prod._id} producto={prod} />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">{productos.length === 0 ? "Cargando..." : `No hay stock en ${cat1.nombre}`}</h4>
            </div>
          )}
        </Row>
        <Row className="py-5">
          <CarruselOfertas />
        </Row>
        <Row className="mb-4">
          <Col sm={12}>
            <div className="bg-dark text-white py-2 px-5 shadow w-100 d-flex align-items-center justify-content-center contenedorCat">
              <h2 className="m-0 fw-bold tituloCat">{cat2.nombre}</h2>
            </div>
          </Col>
        </Row>
        <Row className="mb-5">
          {productosSeccion2.length > 0 ? (
            productosSeccion2.map((prod) => (
              <CardProducto key={prod._id} producto={prod} />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">
                {productos.length === 0 ? "Cargando..." : `No hay stock en ${cat2.nombre}`}
              </h4>
            </div>
          )}
        </Row>
        <Row className="mb-4">
          <Col sm={12}>
            <div className="bg-dark text-white py-2 px-5 shadow w-100 d-flex align-items-center justify-content-center contenedorCat">
              <h2 className="m-0 fw-bold tituloCat">{cat3.nombre}</h2>
            </div>
          </Col>
        </Row>
        <Row className="mb-5">
          {productosSeccion3.length > 0 ? (
            productosSeccion3.map((prod) => (
              <CardProducto key={prod._id} producto={prod} />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">
                {productos.length === 0 ? "Cargando..." : `No hay stock en ${cat3.nombre}`}
              </h4>
            </div>
          )}
        </Row>
        <Row className="mb-4">
          <Col sm={12}>
            <div className="bg-dark text-white py-2 px-5 shadow w-100 d-flex align-items-center justify-content-center contenedorCat">
              <h2 className="m-0 fw-bold tituloCat">{cat4.nombre}</h2>
            </div>
          </Col>
        </Row>
        <Row className="mb-5">
          {productosSeccion4.length > 0 ? (
            productosSeccion4.map((prod) => (
              <CardProducto key={prod._id} producto={prod} />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">
                {productos.length === 0 ? "Cargando..." : `No hay stock en ${cat4.nombre}`}
              </h4>
            </div>
          )}
        </Row>
        <Row className="mb-4">
          <Col sm={12}>
            <div className="bg-dark text-white py-2 px-5 shadow w-100 d-flex align-items-center justify-content-center contenedorCat">
              <h2 className="m-0 fw-bold tituloCat">{cat5.nombre}</h2>
            </div>
          </Col>
        </Row>
        <Row className="mb-5">
          {productosSeccion5.length > 0 ? (
            productosSeccion5.map((prod) => (
              <CardProducto key={prod._id} producto={prod} />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">
                {productos.length === 0 ? "Cargando..." : `No hay stock en ${cat5.nombre}`}
              </h4>
            </div>
          )}
        </Row>
        <Row className="mb-4">
          <Col sm={12}>
            <div className="bg-dark text-white py-2 px-5 shadow w-100 d-flex align-items-center justify-content-center contenedorCat">
              <h2 className="m-0 fw-bold tituloCat">{cat6.nombre}</h2>
            </div>
          </Col>
        </Row>
        <Row className="mb-5">
          {productosSeccion6.length > 0 ? (
            productosSeccion6.map((prod) => (
              <CardProducto key={prod._id} producto={prod} />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">
                {productos.length === 0 ? "Cargando..." : `No hay stock en ${cat6.nombre}`}
              </h4>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Inicio;
