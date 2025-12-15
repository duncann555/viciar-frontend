const usuariosBackend = import.meta.env.VITE_API_USUARIOS;

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

const CART_KEY = "carrito";

export const leerCarrito = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

export const agregarAlCarrito = (idProducto) => {
  const carrito = leerCarrito();

  const index = carrito.findIndex(
    (item) => item.idProducto === idProducto
  );

  if (index >= 0) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ idProducto, cantidad: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
};

export const quitarDelCarrito = (idProducto) => {
  const carrito = leerCarrito().filter(
    (item) => item.idProducto !== idProducto
  );
  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
};

export const limpiarCarrito = () => {
  localStorage.removeItem(CART_KEY);
};

