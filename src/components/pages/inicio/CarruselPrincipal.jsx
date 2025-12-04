import {Carousel, CarouselItem} from "react-bootstrap"
import blackFriday from "../../../assets/blackFriday.png"
import juegos from "../../../assets/juegos.png"
import promos from "../../../assets/promo.png"

const Carrusel = () => {
    return (
        <Carousel>
            <CarouselItem>
                <img loading="eager" className="imagen-Carousel" src={blackFriday} alt="banner oferta blackfriday" />
            </CarouselItem>
            <CarouselItem>
                <img loading="eager" className="imagen-Carousel" src={juegos} alt="imagen de los juegos ofrecidos" />
            </CarouselItem>
            <CarouselItem>
                <img loading="eager" className="imagen-Carousel" src={promos} alt="primera imagen del carrusel" />
            </CarouselItem>
        </Carousel>
    );
};

export default Carrusel;