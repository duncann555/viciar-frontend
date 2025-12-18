import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { crearUsuario } from "../../helpers/queries";
import "../../styles/register.css";
import { Button } from "react-bootstrap";

const initialValues = {
  nombre: "",
  apellido: "",
  email: "",
  dni: "",
  telefono: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

function validateField(name, value, allValues) {
  const v = typeof value === "string" ? value.trim() : value;

  switch (name) {
    case "nombre":
      if (!v) return "El nombre es obligatorio.";
      if (v.length < 3) return "Mínimo 3 caracteres.";
      return "";

    case "apellido":
      if (!v) return "El apellido es obligatorio.";
      if (v.length < 3) return "Mínimo 3 caracteres.";
      return "";

    case "email":
      if (!v) return "El email es obligatorio.";
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(v)) return "Email inválido.";
      return "";

    case "dni":
      if (!v) return "El DNI es obligatorio.";
      if (!/^\d{7,8}$/.test(v)) return "Debe tener 7 u 8 números.";
      return "";

    case "telefono":
      if (!v) return "El teléfono es obligatorio.";
      if (!/^\d{8,15}$/.test(v)) return "Número inválido.";
      return "";

    case "password":
      if (!v) return "La contraseña es obligatoria.";
      if (v.length < 8) return "Mínimo 8 caracteres.";
      if (!/[A-Z]/.test(v)) return "Debe incluir una mayúscula.";
      if (!/[a-z]/.test(v)) return "Debe incluir una minúscula.";
      if (!/\d/.test(v)) return "Debe incluir un número.";
      return "";

    case "confirmPassword":
      if (!v) return "Repetí la contraseña.";
      if (v !== allValues.password) return "Las contraseñas no coinciden.";
      return "";

    case "terms":
      if (!value) return "Debés aceptar los términos.";
      return "";

    default:
      return "";
  }
}

function validateAll(values) {
  const errors = {};
  Object.keys(values).forEach((key) => {
    const err = validateField(key, values[key], values);
    if (err) errors[key] = err;
  });
  return errors;
}

export default function Register() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === "checkbox" ? checked : value;
    const newValues = { ...values, [name]: newVal };
    setValues(newValues);

    if (touched[name]) {
      setErrors({
        ...errors,
        [name]: validateField(name, newVal, newValues),
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({
      ...errors,
      [name]: validateField(name, values[name], values),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateAll(values);
    setErrors(errs);

    setTouched({
      nombre: true,
      apellido: true,
      email: true,
      dni: true,
      telefono: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });

    if (Object.keys(errs).length > 0) return;

    const usuarioParaGuardar = { ...values };
    delete usuarioParaGuardar.confirmPassword;
    delete usuarioParaGuardar.terms;

    try {
      const respuesta = await crearUsuario(usuarioParaGuardar);

      if (respuesta && respuesta.status === 201) {
        Swal.fire({
          icon: 'success',
          title: '¡Cuenta creada!',
          text: 'Ahora puedes iniciar sesión',
          showConfirmButton: false,
          timer: 2000
        });
        setValues(initialValues);
        // CAMBIO: Ahora redirige al Inicio (Home)
        navigate("/");
      } else {
        const resultado = await respuesta.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: resultado.mensaje || 'No se pudo crear el usuario',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'Intente nuevamente más tarde',
      });
    }
  };

  return (
    <div className="reg-wrapper">
      <div className="reg-card">
        <h1>Crear cuenta</h1>
        <p className="reg-sub">Completá los datos para registrarte.</p>

        <form className="reg-form" onSubmit={handleSubmit}>

          <div className="reg-row">
            <div className="reg-field">
              <label>Nombre</label>
              <input
                name="nombre"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ej: Juan"
              />
              {touched.nombre && errors.nombre && (
                <p className="reg-error">{errors.nombre}</p>
              )}
            </div>

            <div className="reg-field">
              <label>Apellido</label>
              <input
                name="apellido"
                value={values.apellido}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ej: Pérez"
              />
              {touched.apellido && errors.apellido && (
                <p className="reg-error">{errors.apellido}</p>
              )}
            </div>
          </div>

          <div className="reg-field">
            <label>Email</label>
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="email@ejemplo.com"
            />
            {touched.email && errors.email && (
              <p className="reg-error">{errors.email}</p>
            )}
          </div>

          <div className="reg-row">
            <div className="reg-field">
              <label>DNI</label>
              <input
                name="dni"
                value={values.dni}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ej: 40123456"
              />
              {touched.dni && errors.dni && (
                <p className="reg-error">{errors.dni}</p>
              )}
            </div>

            <div className="reg-field">
              <label>Teléfono</label>
              <input
                name="telefono"
                value={values.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ej: 3812345678"
              />
              {touched.telefono && errors.telefono && (
                <p className="reg-error">{errors.telefono}</p>
              )}
            </div>
          </div>

          <div className="reg-row">
            <div className="reg-field">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Mínimo 8 caracteres"
              />
              {touched.password && errors.password && (
                <p className="reg-error">{errors.password}</p>
              )}
            </div>

            <div className="reg-field">
              <label>Repetir contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Repetir contraseña"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="reg-error">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <label className="reg-check">
            <input
              type="checkbox"
              name="terms"
              checked={values.terms}
              onChange={handleChange}
            />
            Acepto los términos y condiciones
          </label>
          {touched.terms && errors.terms && (
            <p className="reg-error">{errors.terms}</p>
          )}

          {/* Botón corregido: type="submit" y sin 'to' */}
          <Button className="reg-btn" type="submit">Crear cuenta</Button>

          <div className="reg-login-link">
            ¿Ya tenés cuenta?
            {/* Link corregido: NavLink en vez de <a> */}
            <NavLink to="/login"> Iniciar sesión</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}