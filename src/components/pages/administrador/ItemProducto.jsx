import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Swal from 'sweetalert2';
import { cambiarEstadoProductoAPI, eliminarProductoAPI, obtenerProductosAPI } from '../../../helpers/queries';

const ItemProducto = ({ itemProducto, obtenerColorBadgeStock, fila, setProductos, abrirModalProductoEditar }) => {
    const eliminarProducto = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: `Vas a eliminar el producto "${itemProducto.nombre}". Esta acción no se puede deshacer.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const respuesta = await eliminarProductoAPI(itemProducto._id);
                if (respuesta.status === 200) {
                    Swal.fire({
                        title: "Eliminado",
                        text: `El producto "${itemProducto.nombre}" fue eliminado correctamente.`,
                        icon: "success",
                        timer: 2000,
                    });
                }
                const productos = await obtenerProductosAPI();
                if (productos.status === 200) {
                    const productosRestantes = await productos.json();
                    setProductos(productosRestantes);
                }
            }
        })
    }

    const cambiarEstadoProducto = async () => {
        const estado = itemProducto.estado;
        if (estado === "Activo") {
            const estadoNuevo = "Inactivo"
            const respuesta = await cambiarEstadoProductoAPI(itemProducto._id, estadoNuevo);
            if (respuesta.status === 200) {
                const datosNuevos = await obtenerProductosAPI();
                const productosActualizados = await datosNuevos.json();
                setProductos(productosActualizados);
            } else {
                alert("Error al actualizar el estado del producto")
            }
        } else {
            const estadoNuevo = "Activo";
            const respuesta = await cambiarEstadoProductoAPI(itemProducto._id, estadoNuevo);
            if (respuesta.status === 200) {
                const datosNuevos = await obtenerProductosAPI();
                const productosActualizados = await datosNuevos.json();
                setProductos(productosActualizados);
            } else {
                alert("Error al actualizar el estado del producto")
            }
        }
    }

    return (
        <tr key={itemProducto._id}>
            <td>{fila}</td>

            <td>
                <img
                    src={itemProducto.imagenUrl}
                    alt={itemProducto.nombre}
                    style={{
                        width: "56px",
                        height: "56px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
            </td>

            <td>{itemProducto.nombre}</td>
            <td>{itemProducto.categoria}</td>

            <td>
                <Badge bg={obtenerColorBadgeStock(itemProducto.stock)}>
                    {itemProducto.stock}
                </Badge>
            </td>

            <td>{new Date(itemProducto.ultimoControl).toLocaleString("es-AR")}</td>
            <td>${itemProducto.precio}</td>

            <td>
                <Badge bg={itemProducto.estado === "Activo" ? "success" : "warning"}>
                    {itemProducto.estado}
                </Badge>
            </td>

            <td>
                <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirModalProductoEditar(itemProducto)}
                >
                    Editar
                </Button>

                <Button
                    variant={
                        itemProducto.estado === "Activo"
                            ? "outline-warning"
                            : "outline-success"
                    }
                    size="sm"
                    className="me-2"
                    onClick={() => cambiarEstadoProducto(itemProducto._id)}
                >
                    {itemProducto.estado === "Activo" ? "Suspender" : "Activar"}
                </Button>

                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => eliminarProducto(itemProducto._id)}
                >
                    Eliminar
                </Button>
            </td>
        </tr>
    );
};

export default ItemProducto;