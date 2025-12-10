import {Carousel, CarouselItem, Container} from "react-bootstrap"
import ps2 from "../../../assets/ps2.png";
import pc from "../../../assets/pc.png";
import silla from "../../../assets/SILLA.mp4";
import videoblack from "../../../assets/videoblack.mp4";
import joystick from "../../../assets/Joystick.mp4";
import juego from "../../../assets/juego.mp4";
import xbox from "../../../assets/xbox.mp4";

const CarruselOferta = () => {
    return (
        <Carousel>
            <CarouselItem>
                <video autoPlay muted loop playsInline className="imagen-ofertas" src={joystick} alt="video de blackFriday" />
            </CarouselItem>
            <CarouselItem className="">
                <video autoPlay muted loop playsInline className="imagen-ofertas" src={juego} alt="video oferta silla gamer" />
            </CarouselItem>
            <CarouselItem>
                <video autoPlay muted loop playsInline className="imagen-ofertas" src={xbox} alt="video oferta silla gamer" />
            </CarouselItem>
        </Carousel>
        
    );
};

export default CarruselOferta;