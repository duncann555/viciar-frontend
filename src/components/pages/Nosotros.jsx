import {CardMiembro} from './nosotros/CardMiembro.jsx';
import { Container, Row } from 'react-bootstrap';
import '../../styles/nosotros.css'
import PaulaG from '../../assets/PaulaG.jpeg';

const miembrosDelEquipo = [
	{
		id: 3,
		nombre: 'Paula Gramajo',
		imagen: PaulaG,
		github: 'https://github.com/PaulaGramajo',
		linkedin: 'https://github.com/PaulaGramajo',
	},
    {
		id: 3,
		nombre: 'Paula Gramajo',
		imagen: PaulaG,
		github: 'https://github.com/PaulaGramajo',
		linkedin: 'https://github.com/PaulaGramajo',
	},
    {
		id: 3,
		nombre: 'Paula Gramajo',
		imagen: PaulaG,
		github: 'https://github.com/PaulaGramajo',
		linkedin: 'https://github.com/PaulaGramajo',
	},
    {
		id: 3,
		nombre: 'Paula Gramajo',
		imagen: PaulaG,
		github: 'https://github.com/PaulaGramajo',
		linkedin: 'https://github.com/PaulaGramajo',
	},
    {
		id: 3,
		nombre: 'Paula Gramajo',
		imagen: PaulaG,
		github: 'https://github.com/PaulaGramajo',
		linkedin: 'https://github.com/PaulaGramajo',
	},
];

const Nosotros = () => {
    return (
        <Container className='border rounded-4 my-3 contenedor-nosotros'>
			<div className='text-center pt-3'>
				<h1 className='fw-bold'>Conocé a nuestro equipo</h1>
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