import React from "react";
import "../../styles/Error404.css";
import errorGif from "../../assets/error404.gif";

export default function Error404() {
  return (
    <section className="error404-wrapper">
      <div className="error404-card">
        <img src={errorGif} alt="Error 404" className="error404-gif" />

        <h1 className="error404-title">Error 404</h1>
        <p className="error404-subtitle">
          Error 404: misión no encontrada.
        </p>

        <button
          className="error404-btn"
          onClick={() => (window.location.href = "/")}
        >
          Volver al inicio
        </button>
      </div>
    </section>
  );
}
