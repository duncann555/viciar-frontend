const usuariosBackend = import.meta.env.VITE_API_USUARIOS;
const productosBackend = import.meta.env.VITE_API_PRODUCTOS;

export const login = async (usuario) => {
  try {
    const respuesta = await fetch(usuariosBackend + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const obtenerProductosAPI = async () => {
  try {
    const respuesta = await fetch(productosBackend);
    return respuesta;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const crearProductosAPI = async (producto) => {
  try {
    const respuesta = await fetch(productosBackend, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("usuarioKey")).token,
      },
      body: JSON.stringify(producto),
    });
    return respuesta;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const eliminarProductoAPI = async (id) => {
  try {
    const respuesta = await fetch(`${productosBackend}${id}`, {
      method: "DELETE",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("usuarioKey")).token,
      },
    });
    return respuesta;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const cambiarEstadoProductoAPI = async (id, estado) => {
  try {
    const respuesta = await fetch(`${productosBackend}${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("usuarioKey")).token,
      },
      body: JSON.stringify({ estado }),
    });
    return respuesta;
  } catch (err) {
    console.error(err);
    return null;
  }
};
