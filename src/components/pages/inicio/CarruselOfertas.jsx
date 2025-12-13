import {Carousel, CarouselItem, Container} from "react-bootstrap"
import juegoPlay from "../../../assets/juegoPlay.mp4";
import joystick from "../../../assets/Joystick.mp4";
import play from "../../../assets/play5.mp4"
import juego from "../../../assets/juego.mp4";
import xbox from "../../../assets/xbox.mp4";
import teclado from "../../../assets/teclado.mp4"

const CarruselOferta = () => {
    return (
        <Carousel className="d-none d-md-block my-4">
            
            {/* Slide 1 */}
            <CarouselItem>
                <div className="contenedor-videos px-3"> 
                    <video autoPlay muted loop playsInline className="imagen-ofertas" src={play} title="Oferta Play" />
                    <video autoPlay muted loop playsInline className="imagen-ofertas" src={juegoPlay} title="Oferta Juego" />
                    <video autoPlay muted loop playsInline className="imagen-ofertas" src={joystick} title="Oferta Joystick" />
                </div>
            </CarouselItem>

            {/* Slide 2 */}
            <CarouselItem>
                <div className="contenedor-videos px-3">
                    <video autoPlay muted loop playsInline className="imagen-ofertas" src={xbox} title="Oferta Xbox" />
                    <video autoPlay muted loop playsInline className="imagen-ofertas" src={juego} title="Oferta Juego" />
                    <video autoPlay muted loop playsInline className="imagen-ofertas" src={teclado} title="Oferta Teclado" />
                </div>
            </CarouselItem>

        </Carousel>
    );
};

export default CarruselOferta;