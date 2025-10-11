import React from "react";

function Message({ message, eliminarMensaje }) {
  const status_colores = {
    "no-visto": "yellow",
    "visto": "blue",
    "no-recibido": "gray"
  };

  return (
    <div
      className={`mensaje ${message.emisor === "YO" ? "derecha" : "izquierda"}`}>
      <div className="burbuja">
        <p>{message.texto}</p>
        <div className="info">
          <span className="hora">{message.hora}</span>
          {message.emisor === "YO" && (
            <span
              className="estado"
              style={{ backgroundColor: status_colores[message.status] }}
            ></span>
          )}
        </div>
        <button
          className="boton-eliminar"
          onClick={() => eliminarMensaje(message.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Message;