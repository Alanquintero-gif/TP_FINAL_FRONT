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
    // Llamo a la función que vino de arriba
    if (editarMensaje) {
      editarMensaje(message.id, nuevoTexto);
    }
    // Actualizo el texto local inmediatamente para que el usuario lo vea YA,
    // sin esperar nada más.
    // Esto es importante si por algún motivo el estado global tarda medio ms:
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
                  // cancelo y vuelvo al texto original
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

        {/* Botones flotantes (Eliminar / Editar) */}
        {message.emisor === "YO" && (
          <>
            {/* Eliminar siempre que seas vos */}
            <button
              className="boton-eliminar"
              onClick={() => eliminarMensaje && eliminarMensaje(message.id)}
            >
              Eliminar
            </button>

            {/* Editar solo si canEdit es true (o sea: conv backend activa) */}
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
