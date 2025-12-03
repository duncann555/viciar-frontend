import {Carousel, CarouselItem} from "react-bootstrap"
import consola from "../../../assets/consola.jpg"
import joystick from "../../../assets/joystick.jpg"
import logo from '../../../assets/imagen-logo.png'

const Carrusel = () => {
    return (
        <Carousel>
            <CarouselItem>
                <img loading="eager" className="imagen-Carousel" src={logo} alt="primera imagen del carrusel" />
            </CarouselItem>
            <CarouselItem>
                <img loading="eager" className="imagen-Carousel" src={consola} alt="primera imagen del carrusel" />
            </CarouselItem>
            <CarouselItem>
                <img loading="eager" className="imagen-Carousel" src={joystick} alt="primera imagen del carrusel" />
            </CarouselItem>
        </Carousel>
    );
};

export default Carrusel;