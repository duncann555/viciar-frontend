import { useState } from "react";
import "./login.css";

export default function ModalLogin({ show, onClose }) {
  if (!show) return null;

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [remember, setRemember] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 450);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!user || !pass) {
      setError("Completa todos los campos.");
      triggerShake();
      return;
    }

    if (user !== "admin" || pass !== "1234") {
      setError("Usuario o contraseña incorrectos.");
      triggerShake();
      return;
    }

    setError("");
    alert("Login exitoso ✔");
    onClose();
  };

  const handleGoogle = () => {
    alert("Google login (demo)");
  };

  const handleFacebook = () => {
    alert("Facebook login (demo)");
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

        <form onSubmit={handleLogin} className="ml-form">
          <div className="ml-block">
            <label className="ml-label">Usuario</label>
            <div className="ml-field">
              <i className="bi bi-person ml-icon" />
              <input
                type="text"
                placeholder="Tu usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="ml-input"
                autoFocus
              />
            </div>
          </div>

          <div className="ml-block">
            <label className="ml-label">Contraseña</label>
            <div className="ml-field">
              <i className="bi bi-lock ml-icon" />
              <input
                type="password"
                placeholder="Tu contraseña"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="ml-input"
              />
            </div>
          </div>

          <div className="ml-row">
            <label className="ml-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Recordarme
            </label>

            <a className="ml-forgot" href="/forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {error && <p className="ml-error">{error}</p>}

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
