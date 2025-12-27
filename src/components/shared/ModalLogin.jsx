import { useState } from "react";
import "../../styles/login.css";
import { useForm } from "react-hook-form";
import { login } from "../../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function ModalLogin({ show, onClose, setUsuarioLogueado }) {
  if (!show) return null;

  const [shake, setShake] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const navigate = useNavigate();

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 450);
  };

  const postValidaciones = async (data) => {
    try {
      const respuesta = await login(data);
      const datos = await respuesta.json();

      if (respuesta.status === 200) {
        const datosUsuario = {
          id: datos._id,
          rol: datos.rol,
          token: datos.token,
        };

        sessionStorage.setItem("usuarioKey", JSON.stringify(datosUsuario));
        setUsuarioLogueado(datosUsuario);
        onClose();

        Swal.fire({
          icon: "success",
          title: "¡Inicio de sesión exitoso!",
          text: "Bienvenido",
          showConfirmButton: false,
          timer: 2000,
        });

        navigate("/");
        return;
      }

      if (respuesta.status === 404) {
        triggerShake();
        onClose();
        Swal.fire({
          icon: "error",
          title: "Usuario no encontrado",
          text: "El correo ingresado no está registrado",
          confirmButtonColor: "#d33",
        });
        return;
      }

      if (respuesta.status === 401 || respuesta.status === 403) {
        triggerShake();
        onClose();
        Swal.fire({
          icon: "error",
          title: "Acceso denegado",
          text: datos.mensaje,
          confirmButtonColor: "#d33",
        });
        return;
      }
    } catch (error) {
      triggerShake();
      onClose();
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor",
      });
    }
  };

  const handleGoogle = () => {
    onClose();
    navigate("/Error404");
  };

  const handleFacebook = () => {
    onClose();
    navigate("/Error404");
  };

  return (
    <div className="ml-overlay" onClick={onClose}>
      <div
        className={`ml-modal ${shake ? "shake" : ""}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Iniciar sesión"
      >
        <button className="ml-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        <h2 className="ml-title">Iniciar sesión</h2>
        <p className="ml-subtitle">
          Entrá a tu cuenta y seguí viciando tranquilo 🎮
        </p>

        <form onSubmit={handleSubmit(postValidaciones)} className="ml-form">
          <div className="ml-block">
            <label className="ml-label">Correo electrónico</label>
            <div className="ml-field">
              <i className="bi bi-person ml-icon" />
              <input
                type="text"
                placeholder="Tu correo"
                className="ml-input"
                autoFocus
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El email ingresado no es válido",
                  },
                })}
                onChange={() => clearErrors("email")}
              />
            </div>
            <p className="text-danger">{errors.email?.message}</p>
          </div>

          <div className="ml-block">
            <label className="ml-label">Contraseña</label>
            <div className="ml-field">
              <i className="bi bi-lock ml-icon" />
              <input
                type="password"
                placeholder="Tu contraseña"
                className="ml-input"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "Debe tener al menos 8 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                    message:
                      "Debe incluir mayúscula, minúscula, número y carácter especial",
                  },
                })}
                onChange={() => clearErrors("password")}
              />
            </div>
            <p className="text-danger">{errors.password?.message}</p>
          </div>

          <div className="ml-row">
            <label className="ml-remember">
              <input type="checkbox" />
              Recordarme
            </label>

            <a
              className="ml-forgot"
              href="/Error404"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                navigate("/Error404");
              }}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button type="submit" className="ml-btn">
            Ingresar
          </button>
        </form>

        <div className="ml-divider">
          <span>o ingresá con</span>
        </div>

        <div className="ml-social">
          <button
            type="button"
            className="ml-social-btn google"
            onClick={handleGoogle}
          >
            <i className="bi bi-google" />
            Continuar con Google
          </button>

          <button
            type="button"
            className="ml-social-btn facebook"
            onClick={handleFacebook}
          >
            <i className="bi bi-facebook" />
            Continuar con Facebook
          </button>
        </div>

        <p className="ml-register">
          ¿No tenés cuenta? <a href="/register">Registrate acá</a>
        </p>
      </div>
    </div>
  );
}
