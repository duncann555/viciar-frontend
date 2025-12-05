import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Carrito = () => {
    const [paso, SetPaso] = useState(1);

    const siguienteFormulario = () => {
        SetPaso(paso + 1);
    }

    const volverFormulario = () => {
        SetPaso(paso - 1);
    }


    return (
        <section className="container-fluid mt-3">
            <Form>
                <div className="row">

                    {/* Columna para tomar los datos del usuario */}
                    <div className="col-12 col-md-6 border border-black">
                        <div className="card mb-4 shadow-sm">
                            {paso === 1 ? (
                                <>
                                    <div className="card-body">
                                        <h5 className='text-center'>Datos del cliente</h5>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Nombre</Form.Label>
                                                    <Form.Control type="text" placeholder="Ej: Juan" />
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Apellido</Form.Label>
                                                    <Form.Control type="text" placeholder="Ej: Perez" />
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6"><Form.Group className="mb-3">
                                                <Form.Label>DNI</Form.Label>
                                                <Form.Control type="text" placeholder="Ej: 45785688" />
                                                <Form.Text className="text-muted">
                                                    We'll never share your email with anyone else.
                                                </Form.Text>
                                            </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="email" placeholder="Ej: juanperez@gmail.com" />
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Telefono</Form.Label>
                                                    <Form.Control type="text" placeholder="Ej: 3863457824" />
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <Button className='btn btn-primary' onClick={siguienteFormulario}>Siguiente<i class="bi bi-arrow-right ms-1"></i></Button>
                                        </div>
                                    </div>
                                </>
                            ) : false}
                        </div>
                        {paso === 2 ? (
                            <>
                                <div className="card mb-4 shadow-sm">
                                    {/* Datos del envio */}
                                    <div className="card-body">
                                        <h5>Datos de envio</h5>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Provincia</Form.Label>
                                                    <Form.Select>
                                                        <option value="">Seleccione una provincia</option>
                                                        <option value="Buenos Aires">Buenos Aires</option>
                                                        <option value="Cordoba">Cordoba</option>
                                                        <option value="Neuquen">Neuquen</option>
                                                        <option value="Tucuman">Tucuman</option>
                                                        <option value="Salta">Salta</option>
                                                    </Form.Select>
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Ciudad</Form.Label>
                                                    <Form.Control type='text' placeholder='ej: Concepcion' />
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-12">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Domicilio</Form.Label>
                                                    <Form.Control type='text' placeholder='ej: Calle Elm Street' />
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Codigo Postal</Form.Label>
                                                    <Form.Control type='text' placeholder='ej: 7895' />
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <Button className='btn btn-primary' onClick={volverFormulario}><i class="bi bi-arrow-left me-1"></i>Atrás</Button>
                                            <Button className='btn btn-primary mt-2' onClick={siguienteFormulario}>Siguiente<i class="bi bi-arrow-right ms-1"></i></Button>
                                        </div>
                                    </div>
                                </div>
                            </>

                        ) : false}
                        {paso === 3 ? (
                            <>
                                <div className="card mb-4 shadow-sm">
                                    {/* Datos del metodo de pago */}
                                    <div className="card-body">
                                        <h5>Metodo de pago</h5>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Tarjeta</Form.Label>
                                                    <Form.Select>
                                                        <option value="">Seleccione su tarjeta</option>
                                                        <option value="MasterCard">MasterCard</option>
                                                        <option value="Visa">Visa</option>
                                                        <option value="Narana">Naranja</option>
                                                    </Form.Select>
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Numero Tarjeta</Form.Label>
                                                    <Form.Control type="text" placeholder="Ej: 7852 4556 7893" />
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Cuotas</Form.Label>
                                                    <Form.Select>
                                                        <option value="">Cantidad a pagar</option>
                                                        <option value="3">3 Cuotas sin interes</option>
                                                        <option value="6">6 Cuotas sin interes</option>
                                                        <option value="12">12 Cuotas sin interes</option>
                                                    </Form.Select>
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <Button className='btn btn-primary' onClick={volverFormulario}>Atrás</Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : false}
                    </div>
                    <div className="col-12 col-md-6 border border-black">1234</div>
                </div>
            </Form>
        </section >

    );
};

export default Carrito;