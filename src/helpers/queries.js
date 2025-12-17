const usuariosBackend = import.meta.env.VITE_API_USUARIOS;
const productosBackend = import.meta.env.VITE_API_PRODUCTOS;
const pedidosBackend = import.meta.env.VITE_API_PEDIDOS;

const obtenerToken = () => {
  const usuarioLocal = JSON.parse(sessionStorage.getItem("usuarioKey"));
  return usuarioLocal?.token || "";
};

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

export const leerUsuarios = async () => {
  try {
    const respuesta = await fetch(usuariosBackend, {
      method: "GET",
      headers: {
        "x-token": obtenerToken(),
      },
    });

    const datos = await respuesta.json();
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
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("categoria", producto.categoria);
    formData.append("stock", producto.stock);
    formData.append("precio", producto.precio);
    formData.append("imagenUrl", producto.imagenUrl);
    formData.append("descripcion", producto.descripcion);

    const respuesta = await fetch(productosBackend, {
      method: "POST",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("usuarioKey")).token,
      },
      body: formData,
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

export const editarProductoAPI = async (id, producto) => {
  try {
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("categoria", producto.categoria);
    formData.append("stock", producto.stock);
    formData.append("precio", producto.precio);
    formData.append("descripcion", producto.descripcion);

    if (producto.imagenUrl instanceof File) {
      formData.append("imagenUrl", producto.imagenUrl);
    }

    const respuesta = await fetch(`${productosBackend}${id}`, {
      method: "PUT",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("usuarioKey")).token,
      },
      body: formData,
    });
    return respuesta;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const obtenerProductosIdAPI = async (id) => {
  try {
    const respuesta = await fetch(`${productosBackend}${id}`);
    return respuesta;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const obtenerProductoNombreAPI = async (productoBuscado) => {
  try {
    const respuesta = await fetch(
      `${productosBackend}buscar?nombre=${productoBuscado}`
    );
    return respuesta;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const listarPedidosAPI = async () => {
  try {
    const respuesta = await fetch(pedidosBackend, {
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

export const obtenerUsuarioIDAPI = async (id) => {
  try {
    const respuesta = await fetch(`${usuariosBackend}/${id}`, {
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
