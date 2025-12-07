import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link, Form } from "react-router";
import "../../styles/menu.css";
import logoS2 from "../../assets/logoS2.png";

function Menu() {
  return (
    <Navbar expand="lg" className="navbar-bg-color py-lg-3 py-md-2">
      <Container className="position-relative">
        <Navbar.Brand href="/" className="pb-2">
          <img src={logoS2} alt="Logo" className="img-navbar" />
        </Navbar.Brand>
        <div className="d-flex flex-grow-1 justify-content-center">
          <form className="d-lg-flex ms-auto me-4">
            <input
              type="search"
              placeholder="Buscar..."
              className="form-control me-2 barra-busqueda barra-small"
              aria-label="Search"
            />
          </form>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="ms-auto text-center">
            <NavLink to="/" className="nav-link opcion-nav fw-bold">
              Inicio
            </NavLink>
            <NavLink to="/admin" className="nav-link opcion-nav fw-bold">
              Admin
            </NavLink>
            <NavLink to="/" className="nav-link d-none opcion-nav fw-bold">
              Pedidos
            </NavLink>
            <NavLink to="/" className="nav-link d-none opcion-nav fw-bold">
              Usuarios
            </NavLink>
            <NavLink to="/" className="nav-link d-none opcion-nav fw-bold">
              <i class="bi bi-cart3"></i>
            </NavLink>
            <NavLink to="/" className="nav-link opcion-nav fw-bold">
              <i class="bi bi-person-circle icono-user"></i>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
