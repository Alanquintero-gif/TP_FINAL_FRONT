import React, { useState } from "react";

function Message({ message, eliminarMensaje, editarMensaje, canEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.texto);

  const status_colores = {
    "no-visto": "yellow",
    "visto": "blue",
    "no-recibido": "gray",
  };

  const onSave = () => {
    const nuevoTexto = editedText?.trim();
    if (!nuevoTexto) {
      setIsEditing(false);
      return;
    }
    if (editarMensaje) {
      editarMensaje(message.id, nuevoTexto);
    }
   
    setEditedText(nuevoTexto);
    message.texto = nuevoTexto;

    setIsEditing(false);
  };

  return (
    <div
      className={`mensaje ${
        message.emisor === "YO" ? "derecha" : "izquierda"
      }`}
    >
      <div className="burbuja">
        {isEditing ? (
          <div className="edicion-mensaje">
            <input
              type="text"
              className="input-editar"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />

            <div className="botones-editar">
              <button className="guardar" onClick={onSave}>
                Guardar
              </button>
              <button
                className="cancelar"
                onClick={() => {
                  setIsEditing(false);
                  setEditedText(message.texto);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <p>{message.texto}</p>

            <div className="info">
              <span className="hora">{message.hora}</span>
              {message.emisor === "YO" && (
                <span
                  className="estado"
                  style={{
                    backgroundColor: status_colores[message.status] || "blue",
                  }}
                ></span>
              )}
            </div>
          </>
        )}

        {message.emisor === "YO" && (
          <>
            <button
              className="boton-eliminar"
              onClick={() => eliminarMensaje && eliminarMensaje(message.id)}
            >
              Eliminar
            </button>

            {canEdit && !isEditing && (
              <button
                className="boton-editar"
                onClick={() => {
                  setIsEditing(true);
                  setEditedText(message.texto);
                }}
              >
                Editar
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Message;
