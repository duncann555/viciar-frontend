import CarruselPrincipal from "./inicio/CarruselPrincipal.jsx";
import CardProducto from "./inicio/CardProducto.jsx";
import CarruselOfertas from "./inicio/CarruselOfertas.jsx";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { obtenerProductosAPI } from "../../helpers/queries.js";

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
    const respuesta = await obtenerProductosAPI();
    if (respuesta && respuesta.status === 200) {
      const datos = await respuesta.json();
      const prodActivos = datos.filter((p) => p.estado === "Activo");
      setProductos(prodActivos);
    } else {
      console.error("Error al cargar productos o la respuesta es nula");
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
        <h1 className="pt-5 text-center display-4 fw-bolder text-primary-emphasis">
          Bienvenidos a ViciAR
        </h1>
      </div>
      {productosSeccion1.length > 0 && (
        <>
          <Row className="mb-4">
            <Col sm={12} >
              <div className="bg-dark text-white py-2 px shadow w-100 d-flex align-items-center justify-content-center contenedorCat">
                <h2 className="m-0 fw-bold tituloCat">{cat1.nombre}</h2>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            {productosSeccion1.map((prod, index) => (
              <CardProducto key={prod.id || index} producto={prod} />
            ))}
          </Row>
        </>
      )}
      {productosSeccion2.length > 0 && (
        <>
          <Row className="mb-4">
            <Col sm={12}>
              <div className="bg-dark text-white py-2 px-5 shadow w-100 d-flex align-items-center justify-content-center contenedorCat">
                <h2 className="m-0 fw-bold tituloCat">{cat2.nombre}</h2>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            {productosSeccion2.map((prod, index) => (
              <CardProducto key={prod.id || index} producto={prod} />
            ))}
          </Row>
        </>
      )}
      {productosSeccion3.length > 0 && (
        <>
          <Row className="mb-4">
            <Col sm={12}>
              <div className="bg-dark text-white py-2 px-5 shadow w-100 d-flex align-items-center justify-content-center contenedorCat">
                <h2 className="m-0 fw-bold tituloCat">{cat3.nombre}</h2>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            {productosSeccion3.map((prod, index) => (
              <CardProducto key={prod.id || index} producto={prod} />
            ))}
          </Row>
        </>
      )}
      <Row className="py-5">
        <CarruselOfertas />
      </Row>
      {productosSeccion4.length > 0 && (
        <>
          <Row className="mb-4">
            <Col sm={12}>
              <div className="bg-dark text-white py-2 px-5 shadow w-100 d-flex align-items-center justify-content-center contenedorCat">
                <h2 className="m-0 fw-bold tituloCat">{cat4.nombre}</h2>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            {productosSeccion4.map((prod, index) => (
              <CardProducto key={prod.id || index} producto={prod} />
            ))}
          </Row>
        </>
      )}
      {productosSeccion5.length > 0 && (
        <>
          <Row className="mb-4">
            <Col sm={12}>
              <div className="bg-dark text-white py-2 px-5 shadow w-100 d-flex align-items-center justify-content-center contenedorCat">
                <h2 className="m-0 fw-bold tituloCat">{cat5.nombre}</h2>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            {productosSeccion5.map((prod, index) => (
              <CardProducto key={prod.id || index} producto={prod} />
            ))}
          </Row>
        </>
      )}
      {productosSeccion6.length > 0 && (
        <>
          <Row className="mb-4">
            <Col sm={12}>
              <div className="bg-dark text-white py-2 px-5 shadow w-100 d-flex align-items-center justify-content-center contenedorCat">
                <h2 className="m-0 fw-bold tituloCat">{cat6.nombre}</h2>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            {productosSeccion6.map((prod, index) => (
              <CardProducto key={prod.id || index} producto={prod} />
            ))}
          </Row>
        </>
      )}
    </Container>
  </div>
);
};

export default Inicio;
