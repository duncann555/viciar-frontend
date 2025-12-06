import {Carousel, CarouselItem, Container} from "react-bootstrap"
import ps2 from "../../../assets/ps2.png";
import pc from "../../../assets/pc.png";
import silla from "../../../assets/SILLA.mp4";
import videoblack from "../../../assets/videoblack.mp4";

const CarruselOferta = () => {
    return (
        <Carousel>
            <CarouselItem>
                <img loading="eager" className="imagen-ofertas" src={ps2} alt="oferta ps2" />
            </CarouselItem>
            <CarouselItem>
                <video autoPlay muted loop playsInline className="imagen-ofertas" src={videoblack} alt="video de blackFriday" />
            </CarouselItem>
            <CarouselItem>
                <img loading="eager" className="imagen-ofertas" src={pc} alt="oferta pc" />
            </CarouselItem>
            <CarouselItem>
                <video autoPlay muted loop playsInline className="imagen-ofertas" src={silla} alt="video oferta silla gamer" />
            </CarouselItem>
            
        </Carousel>
        
    );
};

export default CarruselOferta;