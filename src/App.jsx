import Menu from "./components/shared/Menu.jsx";
import Footer from "./components/shared/Footer.jsx";
import Admin from "./components/pages/Admin.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./components/pages/Inicio.jsx";
import Carrito from "./components/pages/carrito/Carrito.jsx";
import Register from "./components/pages/Register.jsx";
import Nosotros from "./components/pages/Nosotros.jsx"
import Contacto from "./components/pages/Contacto.jsx";
import DetalleProducto from "./components/pages/DetalleProducto.jsx"
import Error404 from "./components/pages/Error404.jsx"
import Filtro from "./components/pages/inicio/Filtro.jsx"
import ProtectosAdmin from "./components/routes/ProtectosAdmin.jsx";
import { useEffect, useState } from "react";
import { obtenerProductosAPI } from "./helpers/queries.js";

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, [])

  const obtenerProductos = async () => {
    const respuesta = await obtenerProductosAPI();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setProductos(datos);
    }
  }


  return (
    <BrowserRouter>
      <Menu />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/register" element={<Register />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/detalleproducto" element={<DetalleProducto />} />
          <Route element={<ProtectosAdmin />}>
            <Route path="/admin"
              element={<Admin productos={productos} />}
            >
            </Route>
          </Route>
          <Route path="*" element={<Error404 />} />
          <Route path="/filtro" element={<Filtro />} />

        </Routes>
      </main>
      <Footer />
    </BrowserRouter >
  );
}

export default App;
