import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../../styles/carrito.css"
import ItemProducto from './ItemProducto';
import { useForm } from 'react-hook-form';

const Carrito = () => {
    const [paso, SetPaso] = useState(1);

    const siguienteFormulario = () => {
        SetPaso(paso + 1);
    }

    const volverFormulario = () => {
        SetPaso(paso - 1);
    }

    const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm();

    const postValidaciones = (data) => {
        console.log(data);
        reset();
    }


    return (
        <section className="container-fluid mt-3">
            <Form onSubmit={handleSubmit(postValidaciones)}>
                <div className="row">

                    {/* Columna para tomar los datos del usuario */}
                    <div className="col-12 col-md-6">
                        {paso === 1 ? (
                            <>
                                <div className="card mb-4 shadow">
                                    <div className="card-body">
                                        <h5>Datos del cliente</h5>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Nombre</Form.Label>
                                                    <Form.Control type="text" placeholder="Ej: Juan"
                                                        {...register("nombre", {
                                                            required: "El nombre es un dato obligatorio",
                                                            minLength: {
                                                                value: 15,
                                                                message: "El nombre debe contener minimo 15 caracteres"
                                                            },
                                                            maxLength: {
                                                                value: 70,
                                                                message: "El nombre debe contener maximo 70 caracteres"
                                                            },
                                                        })}
                                                        onChange={() => clearErrors("nombre")}
                                                    />
                                                    <Form.Text className="text-muted">
                                                        {errors.nombre?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Apellido</Form.Label>
                                                    <Form.Control type="text" placeholder="Ej: Perez"
                                                        {...register("apellido", {
                                                            required: "El apellido es un dato obligatorio",
                                                            minLength: {
                                                                value: 4,
                                                                message: "El apellido debe contener minimo 4 caracteres"
                                                            },
                                                            maxLength: {
                                                                value: 30,
                                                                message: "El apellido debe contener maximo 30 caracteres"
                                                            }
                                                        })}
                                                        onChange={() => clearErrors("apellido")}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.apellido?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6"><Form.Group className="mb-3">
                                                <Form.Label>DNI</Form.Label>
                                                <Form.Control type="text" placeholder="Ej: 45785688"
                                                    {...register("DNI", {
                                                        required: "El DNI es un dato obligatorio",
                                                        maxLength: {
                                                            value: 8,
                                                            message: "El DNI debe contener 8 digitos"
                                                        }
                                                    })}
                                                />
                                                <Form.Text className="text-danger">
                                                    {errors.DNI?.message}
                                                </Form.Text>
                                            </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="email" placeholder="Ej: juanperez@gmail.com"
                                                        {...register("email", {
                                                            required: "El email es un dato obligatorio",
                                                            pattern: {
                                                                value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                                                message: "El email ingresado no es valido"
                                                            }
                                                        })}
                                                        onChange={() => clearErrors("email")}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.email?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Telefono</Form.Label>
                                                    <Form.Control type="text" placeholder="Ej: 3863457824"
                                                        {...register("telefono", {
                                                            required: "El telefono es un dato obligatorio",
                                                            minLength: {
                                                                value: 8,
                                                                message: "El telefono debe contener minimo 8 caracteres"
                                                            },
                                                            maxLength: {
                                                                value: 10,
                                                                message: "El telefono debe contener maximo 10 caracteres"
                                                            }
                                                        })}
                                                        onChange={() => clearErrors("telefono")}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.telefono?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-12 d-flex justify-content-end">
                                                <Button className='btn btn-navegacion' onClick={siguienteFormulario}>Siguiente<i class="bi bi-arrow-right ms-1"></i></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : false}
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
                                                    <Form.Select {...register("provincia", {
                                                        required: "La provincia es un dato obligatorio"

                                                    })}
                                                        onChange={() => clearErrors("provincia")}
                                                    >
                                                        <option value="">Seleccione una provincia</option>
                                                        <option value="Buenos Aires">Buenos Aires</option>
                                                        <option value="Cordoba">Cordoba</option>
                                                        <option value="Neuquen">Neuquen</option>
                                                        <option value="Tucuman">Tucuman</option>
                                                        <option value="Salta">Salta</option>
                                                    </Form.Select>
                                                    <Form.Text className="text-danger">
                                                        {errors.provincia?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Ciudad</Form.Label>
                                                    <Form.Control type='text' placeholder='ej: Concepcion'
                                                        {...register("ciudad", {
                                                            required: "La ciudad es un dato obligatorio",
                                                            minLength: {
                                                                value: 4,
                                                                message: "La ciudad debe contener minimo 4 caracteres"
                                                            },
                                                            maxLength: {
                                                                value: 50,
                                                                message: "La ciudad debe contener maximo 50 caracteres"
                                                            }
                                                        })}
                                                        onChange={() => clearErrors("ciudad")}
                                                    />

                                                    <Form.Text className="text-danger">
                                                        {errors.ciudad?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Domicilio</Form.Label>
                                                    <Form.Control type='text' placeholder='ej: Calle Elm Street'
                                                        {...register("domicilio", {
                                                            required: "El domicilio es un dato obligatorio",
                                                            minLength: {
                                                                value: 6,
                                                                message: "El domicilio debe contener minimo 6 caracteres"
                                                            },
                                                            maxLength: {
                                                                value: 30,
                                                                message: "El domicilio debe contener maximo 30 caracteres"
                                                            }
                                                        })}
                                                        onChange={() => clearErrors("domicilio")}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.domicilio?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Codigo Postal</Form.Label>
                                                    <Form.Control type='text' placeholder='ej: 7895'
                                                        {...register("codigopostal", {
                                                            required: "El codigo postal es un dato obligatorio",
                                                            minLength: {
                                                                value: 4,
                                                                message: "El codigo postal debe contener minimo 4 caracteres"
                                                            },
                                                            maxLength: {
                                                                value: 8,
                                                                message: "El codigo postal debe contener maximo 8 caracteres"
                                                            }
                                                        })}
                                                        onChange={() => clearErrors("codigopostal")}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.codigopostal?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-12 mt-2 d-flex justify-content-between">
                                                <Button className='btn btn-navegacion mt-2 mb-1' onClick={volverFormulario}><i class="bi bi-arrow-left me-1"></i>Atrás</Button>
                                                <Button className='btn btn-navegacion mt-2 mb-1' onClick={siguienteFormulario}>Siguiente<i class="bi bi-arrow-right ms-1"></i></Button>
                                            </div>
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
                                                    <Form.Select {...register("tarjeta", {
                                                        required: "Este campo es obligatorio",

                                                    })}
                                                        onChange={() => clearErrors("tarjeta")}
                                                    >
                                                        <option value="">Seleccione su tarjeta</option>
                                                        <option value="MasterCard">MasterCard</option>
                                                        <option value="Visa">Visa</option>
                                                        <option value="Narana">Naranja</option>
                                                    </Form.Select>
                                                    <Form.Text className="text-danger">
                                                        {errors.tarjeta?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Numero Tarjeta</Form.Label>
                                                    <Form.Control type="text" placeholder="Ej: 7852 4556 7893"
                                                        {...register("numeroTarjeta", {
                                                            required: "Este campo es obligatorio",
                                                            minLength: {
                                                                value: 16,
                                                                message: "El numero de tarjeta debe contener minimo 16 caracteres"
                                                            },
                                                            maxLength: {
                                                                value: 20,
                                                                message: "El numero de tarjeta debe contener maximo 16 caracteres"
                                                            }
                                                        })}
                                                        onChange={() => clearErrors("numeroTarjeta")}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.numeroTarjeta?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Cuotas</Form.Label>
                                                    <Form.Select {...register("cuotas", {
                                                        required: "Por favor seleccione una opcion"
                                                    })}
                                                        onChange={() => clearErrors("cuotas")}
                                                    >
                                                        <option value="">Cantidad a pagar</option>
                                                        <option value="1">Pago unico</option>
                                                        <option value="3">3 Cuotas sin interes</option>
                                                        <option value="6">6 Cuotas sin interes</option>
                                                        <option value="12">12 Cuotas sin interes</option>
                                                    </Form.Select>
                                                    <Form.Text className="text-danger">
                                                        {errors.cuotas?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="col-md-6 d-flex justify-content-start">
                                            <Button className='btn btn-navegacion' onClick={volverFormulario}><i class="bi bi-arrow-left me-1"></i>Atrás</Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : false}
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="row">
                            <div className="col-12 mb-3">
                                <div className="card mb-3 shadow">
                                    <div className="card-body">
                                        <h4 className='text-center'>Resumen del pedido</h4>
                                        <ItemProducto nombre="Uncharted 2" precio={4000} imagen="https://http2.mlstatic.com/D_NQ_NP_914928-MLA100087512227_122025-O.webp" ></ItemProducto>
                                        <ItemProducto nombre="God of War 3" precio={2000} imagen="https://stylewatch.vtexassets.com/arquivos/ids/192938/PS4_GOD_OF_WAR_3_REMASTERED_JUEGO_711719531470.jpg?v=637563350684430000"></ItemProducto>
                                        <div className='d-flex justify-content-between align-items-center mt-3'>
                                            <p className='text-center mt-2 fs-5 ms-2'><strong>Total Pedido:</strong> $320.000</p>
                                            <Button type='submit' className='btn btn-navegacion'>Confirmar Pedido</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </section >

    );
};

export default Carrito;