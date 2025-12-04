import CarruselPrincipal from "./inicio/CarruselPrincipal.jsx";
import CardProducto from "./inicio/CardProducto.jsx";
import { Container, Row } from "react-bootstrap";

const Inicio = () => {
    return (
        <div>
            
            <CarruselPrincipal/>
         <Container>
            <div className="mb-5">
            <h1 className="py-3 text-center fw-bolder">Bienvenidos a ViciAR</h1>
            <h5 className="fw-semibold">Donde no vendemos simples juegos. Vendemos las 3 de la mañana con amigos, la adrenalina del último boss y esa sensación de gloria absoluta. Tu próxima obsesión está a un clic de distancia.</h5> 
            </div>  
            <Row>
            <div className="bg-dark text-white py-2 px-5" style={{ transform: 'skewX(-12deg)' }}>   
            <h2 >Juegos de PC</h2>
            </div>
            <div className="py-3">
            <CardProducto/>
            <p>No hay productos disponibles</p>
          </div>
        </Row>
        </Container>
        </div>
    );
};

export default Inicio;