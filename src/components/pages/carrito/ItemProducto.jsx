import React, { use, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../../../styles/carrito.css"
import { InputGroup, Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router';

const ItemProducto = ({ nombre, precio, imagen }) => {
    const [contador, setContador] = useState(1);

    const incrementarContador = () => {
        setContador(contador + 1);
    }

    const decrementarContador = () => {
        setContador(contador - 1);
    }

    return (
        <div className='mt-3'>
            <Card className='d-flex flex-row border bg-body-secondary'>
                <div className='d-flex justify-content-center align-items-center'>
                    <Card.Img src={imagen} className='img-producto-carrito ms-2' />
                </div>
                <Card.Body>
                    <div className='d-flex justify-content-between'>
                        <Card.Title>{nombre}</Card.Title>
                        <p className='mb-3 text-black fs-5 ms-1'>${precio}</p>
                    </div>
                    <p>Cantidad</p>
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
                    <div className='d-flex justify-content-end'>
                        <Button className='btn btn-danger me-2'><i className="bi bi-trash3"></i></Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ItemProducto;