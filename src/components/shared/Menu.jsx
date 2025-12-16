import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom"; // Importamos useNavigate
import "../../styles/menu.css";
import logoS2 from "../../assets/logoS2.png";

import { useState, useEffect } from "react";
import ModalLogin from "./ModalLogin";
import Button from "react-bootstrap/Button";

function Menu() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    const usuarioGuardado = sessionStorage.getItem("usuarioKey");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const handleLogout = () => {
    sessionStorage.removeItem("usuarioKey");
    setUsuarioLogueado(null); 
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-bg-color py-lg-3 py-md-2">
        <Container className="position-relative">
          <Navbar.Brand href="/" className="pb-2">
            <img src={logoS2} alt="Logo" className="img-navbar" />
          </Navbar.Brand>

          <div className="d-flex flex-grow-1 justify-content-center">
            <form onSubmit={manejarEnvio} className="d-lg-flex ms-auto me-4">
              <input
                type="search"
                placeholder="Buscar..."
                className="form-control me-2 barra-busqueda barra-small"
                aria-label="Search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </form>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-center align-items-center">
              <NavLink to="/" className="nav-link opcion-nav fw-bold">
                Inicio
              </NavLink>

              {usuarioLogueado ? (
                <>
                  {usuarioLogueado.rol === "Administrador" ? (
                    <NavLink
                      className="nav-item nav-link opcion-nav fw-bold"
                      to="/admin"
                    >
                      Admin
                    </NavLink>
                  ) : (
                    <NavLink
                      className="nav-item nav-link opcion-nav"
                      to="/carrito"
                    >
                      <i className="bi bi-cart"></i>
                    </NavLink>
                  )}

                  <button
                    className="nav-item nav-link btn opcion-nav fw-bold"
                    onClick={handleLogout}
                  >
                    <i class="bi bi-box-arrow-right"></i>
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    className="nav-item nav-link opcion-nav fw-bold"
                    to="/register"
                  >
                    Registrarse
                  </NavLink>

                  <div
                    className="nav-link opcion-nav fw-bold"
                    onClick={() => setShowLogin(true)}
                  >
                    <i className="bi bi-person-circle icono-user"></i>
                  </div>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ModalLogin
        show={showLogin}
        onClose={() => setShowLogin(false)}
        setUsuarioLogueado={setUsuarioLogueado}
      />
    </>
  );
}

export default Menu;
