import React from 'react';
import { Badge, Button } from 'react-bootstrap';

const ItemPedido = ({ pedido, obtenerColorEstado, abrirModalPedido, dataUsuario }) => {
    return (
        <tr key={pedido.id}>
            <td>{pedido._id}</td>
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
                >
                    {pedido.estado === "Pendiente"
                        ? "Marcar completado"
                        : "Marcar pendiente"}
                </Button>

                <Button
                    variant="outline-danger"
                    size="sm"
                >
                    Eliminar
                </Button>
            </td>
        </tr>
    )
}

export default ItemPedido;