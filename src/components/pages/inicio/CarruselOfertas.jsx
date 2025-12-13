import {Carousel, CarouselItem, Container} from "react-bootstrap"
import juegoPlay from "../../../assets/juegoPlay.mp4";
import joystick from "../../../assets/Joystick.mp4";
import play from "../../../assets/play5.mp4"
import juego from "../../../assets/juego.mp4";
import xbox from "../../../assets/xbox.mp4";
import teclado from "../../../assets/teclado.mp4"

const CarruselOferta = () => {
    return (
        <Carousel className="d-sm-none d-lg-block">
            <CarouselItem>
                <div className="d-flex">
                <video autoPlay muted loop playsInline className="imagen-ofertas" src={play} alt="video de blackFriday" />
                <video autoPlay muted loop playsInline className="imagen-ofertas" src={juegoPlay} alt="video oferta silla gamer" />
                <video autoPlay muted loop playsInline className="imagen-ofertas" src={joystick} alt="video oferta silla gamer" />
                </div>
            </CarouselItem>
            <CarouselItem>
                <div className="d-flex">
                <video autoPlay muted loop playsInline className="imagen-ofertas" src={xbox} alt="video de blackFriday" />
                <video autoPlay muted loop playsInline className="imagen-ofertas" src={juego} alt="video de blackFriday" />
                <video autoPlay muted loop playsInline className="imagen-ofertas" src={teclado} alt="video oferta silla gamer" />
                </div>
            </CarouselItem>
        </Carousel>
        
    );
};

export default CarruselOferta;