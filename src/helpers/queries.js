const usuariosBackend = import.meta.env.VITE_API_USUARIOS;

const obtenerToken = () => {
  const usuarioLocal = JSON.parse(sessionStorage.getItem("usuarioKey")); 
  return usuarioLocal?.token || "";
};

export const login = async (usuario) => {
  try {
    const respuesta = await fetch(usuariosBackend + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const leerUsuarios = async () => {
  try {
    const respuesta = await fetch(usuariosBackend, {
      method: "GET",
      headers: {
        "x-token": obtenerToken(), 
      },
    });

    const datos = await respuesta.json()
    return datos;

  } catch (error) {
    console.log(error);
  }
};

export const crearUsuario = async (usuario) => {
  try {
    const respuesta = await fetch(usuariosBackend, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": obtenerToken(),
      },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const editarUsuario = async (usuario, id) => {
  try {
    const respuesta = await fetch(`${usuariosBackend}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": obtenerToken(),
      },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const cambiarEstadoUsuario = async (id, nuevoEstado) => {
  try {
    const respuesta = await fetch(`${usuariosBackend}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-token": obtenerToken(),
      },
      body: JSON.stringify({
        estado: nuevoEstado,
      }),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const borrarUsuario = async (id) => {
  try {
    const respuesta = await fetch(`${usuariosBackend}/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": obtenerToken(),
      },
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};