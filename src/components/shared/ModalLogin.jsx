import { useState } from "react";
import "./login.css";

export default function ModalLogin({ show, onClose }) {
  if (!show) return null;

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

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

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="ml-overlay" onClick={onClose}>
      <div
        className={`ml-modal ${shake ? "shake" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="ml-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="ml-title">Iniciar sesión</h2>
        <p className="ml-subtitle">
          Entrá a tu cuenta y seguí viciando tranquilo 🎮
        </p>

        <form onSubmit={handleLogin}>
          <label className="ml-label">Usuario</label>
          <input
            type="text"
            className="ml-input big"
            placeholder="Tu usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <label className="ml-label">Contraseña</label>
          <input
            type="password"
            className="ml-input big"
            placeholder="Tu contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <label className="ml-remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Recordarme
          </label>

          {error && <p className="ml-error">{error}</p>}

          <div className="ml-btn-row">
            <button type="button" className="ml-btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="ml-btn-primary">
              Ingresar
            </button>
          </div>
        </form>

        <div className="ml-divider">
          <span>o ingresá con tu email</span>
        </div>

        <button className="ml-social google">
          <i className="bi bi-google"></i>
          Continuar con Google
        </button>

        <button className="ml-social facebook">
          <i className="bi bi-facebook"></i>
          Continuar con Facebook
        </button>

        <p className="ml-register">
          ¿No tenés cuenta? <a href="/register">Registrate acá</a>
        </p>
      </div>
    </div>
  );
}
