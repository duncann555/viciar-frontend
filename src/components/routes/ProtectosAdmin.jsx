import React from 'react';
import { Escape } from 'react-bootstrap-icons';
import { Navigate, Outlet } from 'react-router';

const ProtectosAdmin = () => {
    //Obtenemos los datos del usuario desde el session storage
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};

    //Verificamos que tenga un token
    const Autenticado = usuarioLogueado.token;
    //Verificamos que tenga un rol de administrador
    const admin = usuarioLogueado.rol === "Administrador";

    //Si no esta autenticado no se permite acceso a funcionalidades como agregar productos al carrito
    if (!Autenticado) {
        return <Navigate to="/" replace />
    }
    //Si esta logueado pero no es administrador
    if (!admin) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
};

export default ProtectosAdmin;