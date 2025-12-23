import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";


const CardProducto = ({ producto }) => {
  const agregarAlCarrito = (producto, cantidadDeseada = 1) => {
      const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioKey"));
  
      if (!usuarioLogueado) {
        Swal.fire({
          icon: "warning",
          title: "Atención",
          text: "Debes iniciar sesión para realizar esta acción",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#f0ad4e",
        });
        return;
      }
  const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
      const indice = carritoActual.findIndex((item) => item._id === producto._id);
      
      if (indice !== -1) {
        carritoActual[indice].cantidad += cantidadDeseada;
      } else {
        carritoActual.push({ ...producto, cantidad: cantidadDeseada });
      }
      
      localStorage.setItem("carrito", JSON.stringify(carritoActual));
      
      Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: "El producto fue agregado al carrito correctamente.",
        timer: 1500,
        showConfirmButton: false,
      });
    };

  return (
      <Col xs={12} md={4} lg={3} className="g-3">
      <Card className="h-100 shadow">
        <div className="contenedorImg">
          <Card.Img
            variant="top"
            src={producto.imagenUrl}
            alt={producto.nombre}
            className="imgCard"
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-5">{producto.nombre}</Card.Title>
          <Card.Text className="mt-auto">
            <span className="text-muted small">{producto.categoria}</span>
            <br className="mb-2" />
            <span className="fw-bold fs-5">${producto.precio.toLocaleString()}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end bg-white border-top-0 mt-auto btn-card">
          <Button variant="success" size="sm" className="me-2 " onClick={() => agregarAlCarrito(producto, 1)}>
            <i className="bi bi-cart-plus-fill"></i> Agregar
          </Button>
          <Link
            to={`/detalleproducto/${producto._id}`}
            className="btn btn-primary btn-sm"
          >
            Ver más
          </Link>
        </Card.Footer>
      </Card></Col>
  );
};

export default CardProducto;
