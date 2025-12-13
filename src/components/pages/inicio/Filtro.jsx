import CardProducto from "./CardProducto.jsx";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Filtro = () => {
  const [productos, setProductos] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const terminoBusqueda = searchParams.get("nombre") || "";

    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch(
          `http://localhost:4000/api/productos/buscar?nombre=${terminoBusqueda}`
        );
        const data = await respuesta.json();
        setProductos(data);
      } catch (error) {
        console.error("Error trayendo productos:", error);
      }
    };

    obtenerProductos();
  }, [searchParams]);

  return (
    <div>
      <Container>
        <div className="mb-5">
          <h1 className="py-3 text-center fw-bolder text-primary-emphasis">
            Resultados encontrados para: {searchParams.get("nombre") || "Todos los productos"}
          </h1>
        </div>
        <Row>
        {productos.length > 0 ? (
          productos.map((producto) => (
            <CardProducto key={producto.id} producto={producto} />
          ))
        ) : (
          <h4 className="text-center fw-light">No se encontraron productos con ese nombre.</h4>
        )}
      </Row>
      </Container>
    </div>
  );
};

export default Filtro;
