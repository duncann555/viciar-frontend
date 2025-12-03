import '../../styles/footer.css';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className='container-fluid footer-bg-color text-white'>
            <div className="row">
                <div className="col-12 col-md-4 d-flex flex-column mt-2">
                    <h5>Categorias</h5>
                    <Link className='text-white text-decoration-none mt-1 underline-hover'>Contacto</Link>
                    <Link className='text-white text-decoration-none mt-3'>Quienes Somos</Link>
                    <Link className='text-white text-decoration-none mt-3'>Trabaja con nosotros</Link>
                    <Link className='text-white text-decoration-none mt-3'>Preguntas frecuentes</Link>
                    <Link className='text-white text-decoration-none mt-3'>Terminos y condiciones</Link>
                </div>
                <div className="col-12 col-md-4 mt-2">
                    <h5>Contactanos</h5>
                    <p className='text-white mt-2'><i className="bi bi-whatsapp me-1 mt-md-0"></i>+54 34566734560</p>
                    <p className='text-white'><i className="bi bi-envelope-arrow-up-fill me-2"></i>vici_AR@gmail.com</p>
                    <p className='text-white'><i className="bi bi-geo-alt-fill me-2"></i>Sucursales en: SMT - YB</p>
                </div>
                <div className="col-12 col-md-4 mt-2">
                    <h5>Sigamos conectados</h5>
                    <div>
                        <p className='text-nowrap'>Seguinos en nuestras redes sociales</p>
                        <div className="d-flex redes ms-4">
                            <i className="bi bi-instagram fs-2 me-4"></i>
                            <i className="bi bi-facebook fs-2 me-4"></i>
                            <i className="bi bi-tiktok fs-2 me-4"></i>
                            <i className="bi bi-youtube fs-2 me-4"></i>
                        </div>
                    </div>
                </div>
            </div>
            <p className='text-center mt-3 fw-semibold'>&copy; Copyright ViciAR 2025 Todos los derechos reservados</p>
        </footer >
    );
};

export default Footer;