import Menu from "./components/shared/Menu.jsx";
import Footer from "./components/shared/Footer.jsx";
import Admin from "./components/pages/Admin.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./components/pages/Inicio.jsx";
import Carrito from "./components/pages/carrito/Carrito.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
