import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { cambiarEstadoPedidoAPI, eliminarPedidoAPI, listarPedidosAPI } from '../../helpers/queries';

const ItemPedido = ({ pedido, obtenerColorEstado, abrirModalPedido, dataUsuario, indice, setPedidos }) => {
    const borrarPedido = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const respuesta = await eliminarPedidoAPI(pedido._id);
                if (respuesta.status === 200) {
                    Swal.fire(
                        'Borrado!',
                        'El pedido fue borrado exitosamente.',
                        'success'
                    );
                }
                const RespedidosActualizados = await listarPedidosAPI();
                if (RespedidosActualizados.status === 200) {
                    const datosActualizados = await RespedidosActualizados.json();
                    setPedidos(datosActualizados);
                }
            }
        });
    }

    const cambiarEstadoPedido = async () => {
        const estado = pedido.estado;
        if (estado === "Pendiente") {
            const nuevoEstado = "Aprobado"
            const respuesta = await cambiarEstadoPedidoAPI(pedido._id, nuevoEstado)
            if (respuesta.status === 200) {
                const datosNuevos = await listarPedidosAPI();
                if (datosNuevos.status === 200) {
                    const datosActualizados = await datosNuevos.json();
                    setPedidos(datosActualizados);
                }
            }
        } else {
            const nuevoEstado = "Pendiente";
            const respuesta = await cambiarEstadoPedidoAPI(pedido._id, nuevoEstado)
            if (respuesta.status === 200) {
                const datosNuevos = await listarPedidosAPI();
                if (datosNuevos.status === 200) {
                    const datosActualizados = await datosNuevos.json();
                    setPedidos(datosActualizados);
                }
            }
        }
    }

    return (
        <tr key={pedido.id}>
            <td>{indice}</td>
            <td>${pedido.total}</td>
            <td>
                <Badge bg={obtenerColorEstado(pedido.estado)}>
                    {pedido.estado}
                </Badge>
            </td>
            <td>
                <Button
                    variant="outline-info"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirModalPedido(pedido)}
                >
                    Ver
                </Button>

                <Button
                    variant={
                        pedido.estado === "Pendiente"
                            ? "outline-success"
                            : "outline-secondary"
                    }
                    size="sm"
                    className="me-2"
                    onClick={() => cambiarEstadoPedido()}
                >
                    {pedido.estado === "Pendiente"
                        ? "Marcar completado"
                        : "Marcar pendiente"}
                </Button>

                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => borrarPedido()}
                >
                    Eliminar
                </Button>
            </td>
        </tr>
    )
}

export default ItemPedido;