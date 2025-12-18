import CardProducto from "./CardProducto.jsx";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { obtenerProductoNombreAPI} from "../../../helpers/queries.js";

const Filtro = () => {
  const [productos, setProductos] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const busqueda = searchParams.get("nombre") || "";

    const obtenerProductos = async () => {
      try {
        const respuesta = await obtenerProductoNombreAPI(busqueda);
       if (respuesta && respuesta.status === 200) {
          const data = await respuesta.json();
          const productosActivos = data.filter((p) => p.estado === "Activo");
          setProductos(productosActivos);
        } else {
          setProductos([]); 
        }
      } catch (error) {
        console.error("Error trayendo productos:", error);
      }
    };

    obtenerProductos();
  }, [searchParams]);

  return (

    <Container className="pb-5">
      <div className="mb-5">
        <nav aria-label="breadcrumb" className="mt-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Resultados de búsqueda
          </li>
        </ol>
      </nav>
        <h1 className="text-center fw-bolder text-primary-emphasis">
          Resultados encontrados para: {searchParams.get("nombre") || "Todos los productos"}
        </h1>
      </div>
      <Row>
        {productos.length > 0 ? (
          productos.map((producto) => (
            <CardProducto key={producto._id} producto={producto} />))
        ) : (
          <h4 className="text-center fw-light">No se encontraron productos con ese nombre.</h4>
        )}
      </Row>
    </Container>
  );
};

export default Filtro;
