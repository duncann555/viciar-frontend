import Menu from "./components/shared/Menu.jsx";
import Footer from "./components/shared/Footer.jsx";
import Admin from "./components/pages/Admin.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./components/pages/Inicio.jsx";
import Carrito from "./components/pages/carrito/Carrito.jsx";
import Register from "./components/pages/Register.jsx";
import Nosotros from "./components/pages/Nosotros.jsx"
import Contacto from "./components/pages/Contacto.jsx";
import DetalleProducto from "./components/pages/DetalleProducto.jsx"

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/register" element={<Register />} />
          <Route path="/nosotros" element={<Nosotros/>}/>
          <Route path="/contacto" element={<Contacto/>}/>
          <Route path="/detalleproducto" element={<DetalleProducto/>}/>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
