import {CardMiembro} from './nosotros/CardMiembro.jsx';
import { Container, Row } from 'react-bootstrap';
import '../../styles/nosotros.css'
import PaulaG from '../../assets/PaulaG.jpeg';
import MaxiGT from '../../assets/MaxiGT.jpeg';
import EduV from '../../assets/EduV.jpeg';
import LuisR from '../../assets/LuisR.jpeg';
import SebaF from '../../assets/SebaF.jpeg';

const miembrosDelEquipo = [
	{
		id: 1,
		nombre: 'Héctor Eduardo Velásquez',
		imagen: EduV,
		github: 'https://github.com/eduwavee',
	},
    {
		id: 2,
		nombre: 'Luis Geremias Robles',
		imagen: LuisR,
		github: 'https://github.com/RoblesLuis2212',
	},
    {
		id: 3,
		nombre: 'Maximiliano Gómez Tolrá',
		imagen: MaxiGT,
		github: 'https://github.com/masheee',
		linkedin: 'https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav',
	},
    {
		id: 4,
		nombre: 'Paula Gramajo',
		imagen: PaulaG,
		github: 'https://github.com/PaulaGramajo',
	},
    {
		id: 5,
		nombre: 'Sebastian Flomenbaum',
		imagen: SebaF,
		github: 'https://github.com/duncann555',
	},
];

const Nosotros = () => {
    return (
        <Container className='border rounded-4 my-3 contenedor-nosotros'>
			<div className='text-center pt-3 '>
				<h1 className='fw-bold text-primary-emphasis'>Conocé a nuestro equipo</h1>
				<p className='fs-5 fw-semibold'>
					¡Bienvenido a ViciAR! Conoce a los desarrolladores de este proyecto.
				</p>
			</div>

			<Row className='py-3 d-flex justify-content-center ms-0'>
				{miembrosDelEquipo.map((miembro) => (
					<CardMiembro
						key={miembro.id}
						nombre={miembro.nombre}
						imagen={miembro.imagen}
						github={miembro.github}
						linkedin={miembro.linkedin}
					/>
				))}
			</Row>
		</Container>
    );
};

export default Nosotros;