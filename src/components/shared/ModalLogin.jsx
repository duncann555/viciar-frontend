import { useState } from "react";
import "../../styles/login.css";
import { useForm } from "react-hook-form";
import { login } from "../../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function ModalLogin({ show, onClose, setUsuarioLogueado }) {
  if (!show) return null;

  const [shake, setShake] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm();

  const navigate = useNavigate();

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 450);
  };

  const postValidaciones = async (data) => {
    const respuesta = await login(data);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      console.log(datos);

      const datosUsuario = {
        id: datos._id,
        rol: datos.rol,
        token: datos.token
      }

      sessionStorage.setItem("usuarioKey", JSON.stringify(datosUsuario));
      setUsuarioLogueado(datosUsuario);

      onClose();

      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: `Bienvenido`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      })

      navigate("/");

    } else if (respuesta.status === 403) {
      const datosError = await respuesta.json()

      onClose()

      Swal.fire({
        icon: 'error',
        title: 'Acceso Denegado',
        text: datosError.mensaje,
        confirmButtonColor: '#d33'
      });
    } else {
      triggerShake();
    }
  }

  const handleGoogle = () => {
    onClose();
    navigate("/Error404")
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
            <label className="ml-label">Correo Electronico</label>
            <div className="ml-field">
              <i className="bi bi-person ml-icon" />
              <input
                type="text"
                placeholder="Tu correo"
                className="ml-input"
                autoFocus
                {...register("email", {
                  required: "El email es un dato obligatorio",
                  pattern: {
                    value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    message: "El email ingresado no es valido"
                  }
                })}
                onChange={() => clearErrors("email")}
              />
              <p className="text-danger">{errors.email?.message}</p>
            </div>
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
                  required: "La contraseña es un dato obligatorio",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])\S{8,64}$/,
                    message: "Contraseña no valida"
                  }
                })}
                onChange={() => clearErrors("password")}
              />
              <p className="text-danger">{errors.password?.message}</p>
            </div>
          </div>

          <div className="ml-row">
            <label className="ml-remember">
              <input
                type="checkbox"
              />
              Recordarme
            </label>

            <a className="ml-forgot" href="/forgot-password">
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
