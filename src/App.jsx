import Menu from "./components/shared/Menu.jsx";
import Footer from "./components/shared/Footer.jsx";
import Admin from "./components/pages/Admin.jsx";
import { BrowserRouter, Routes, Route } from 'react-router';
import Inicio from './components/pages/Inicio.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
