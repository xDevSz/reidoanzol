import React from "react";
import "./index.css"; // Estilos separados em CSS

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {title && <h2 className="modal-title">{title}</h2>}

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
2