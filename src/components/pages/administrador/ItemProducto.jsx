import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const ItemProducto = ({ itemProducto, obtenerColorBadgeStock, fila }) => {
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
            <td>{itemProducto.precio}</td>

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
                    onClick={() => abrirModalProductoEditar(itemProducto._id)}
                >
                    Editar
                </Button>

                <Button
                    variant={
                        itemProducto._id === "Activo"
                            ? "outline-warning"
                            : "outline-success"
                    }
                    size="sm"
                    className="me-2"
                    onClick={() => handleSuspenderProducto(itemProducto._id)}
                >
                    {itemProducto._id === "Activo" ? "Suspender" : "Activar"}
                </Button>

                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleEliminarProducto(itemProducto._id)}
                >
                    Eliminar
                </Button>
            </td>
        </tr>
    );
};

export default ItemProducto;