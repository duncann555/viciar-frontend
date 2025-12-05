import React, { use, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../../../styles/carrito.css"
import { InputGroup, Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router';

const ItemProducto = () => {
    const [contador, setContador] = useState(1);

    const incrementarContador = () => {
        setContador(contador + 1);
    }

    const decrementarContador = () => {
        setContador(contador - 1);
    }

    return (
        <div className='mt-3'>
            <Card className='d-flex flex-row border border-black'>
                <Card.Img src="https://acdn-us.mitiendanube.com/stores/910/199/products/uncharted-21-163dfacca606cfcf7115545907239901-1024-1024.webp" className='img-producto-carrito border border-black' />
                <Card.Body>
                    <div className='d-flex justify-content-between'>
                        <Card.Title>Uncharted 2</Card.Title>
                        <p className='mb-3 text-secondary fs-5'>$4000</p>
                    </div>
                    <Card.Text>Cantidad</Card.Text>
                    <InputGroup className='mb-3' style={{ width: '130px' }}>
                        <Button className='btn btn-navegacion' onClick={decrementarContador}><i className="bi bi-dash-lg"></i></Button>
                        <Form.Control
                            value={contador}
                            readOnly
                            type="number"
                            min="1"
                            className='text-center'
                        />
                        <Button className='btn btn-navegacion' onClick={incrementarContador}><i className="bi bi-plus-lg"></i></Button>
                    </InputGroup>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ItemProducto;