import {Carousel, CarouselItem, Container} from "react-bootstrap"
import blackFriday from "../../../assets/blackFriday.png"
import juegos from "../../../assets/juegos.png"
import promos from "../../../assets/promo.png"
import ofertaNavidad from "../../../assets/ofertaNavidad.png"
import logo from "../../../assets/logo.png"

const Carrusel = () => {
    return (
        <Carousel>
            <CarouselItem>
                <img loading="eager" className="imagen-Carousel" src={logo} alt="Logo viciar" />
            </CarouselItem>
            <CarouselItem>
                <img loading="eager" className="imagen-Carousel" src={blackFriday} alt="banner oferta blackfriday" />
            </CarouselItem>
            <CarouselItem>
                <img loading="eager" className="imagen-Carousel" src={juegos} alt="imagen de los juegos ofrecidos" />
            </CarouselItem>
            <CarouselItem>
                <img loading="eager" className="imagen-Carousel" src={promos} alt="imagen de promociones" />
            </CarouselItem>
            <CarouselItem>
                <img loading="eager" className="imagen-Carousel" src={ofertaNavidad} alt="oferta de navidad" />
            </CarouselItem>
        </Carousel>
        
    );
};

export default Carrusel;