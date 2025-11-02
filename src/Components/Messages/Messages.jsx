import React, { useContext, useMemo } from "react";
import { ChatContext } from "../../Context/ChatContext";
import Message from "./Message";
import "./Messages.css";

// util para mostrar la hora
function formatHHMM(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d)) return "";
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

// normalizamos cada mensaje a la forma que tu UI espera:
// { id, texto, hora, emisor, status }
function normalizeMessage(raw) {
  // id del mensaje
  const id = raw._id || raw.id;

  // texto del mensaje
  const texto =
    raw.text ||
    raw.texto ||
    raw.body ||
    raw.content ||
    "" ;

  // hora (o la que ya venga si es mock)
  const hora =
    raw.hora ||
    formatHHMM(raw.createdAt || raw.timestamp || Date.now());

  // quién lo mandó
  // En los mocks vos usás "YO" y "USUARIO".
  // En backend quizás venga info distinta.
  // Vamos a intentar inferir "YO".
  const soyYo =
    raw.emisor === "YO" ||
    raw.fromMe === true ||
    raw.isMine === true ||
    raw.sender === "me" ||
    raw.sender === "YO";

  const emisor = soyYo ? "YO" : "USUARIO";

  // estado (para el puntito de color que ya tenés)
  const status = raw.status || "visto";

  return {
    id,
    texto,
    hora,
    emisor,
    status,
  };
}

function EmptyChat() {
  return (
    <div
      className="contenedor-mensajes"
      style={{
        opacity: 0.6,
        padding: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#bbb",
        fontSize: "14px",
      }}
    >
      Seleccioná un chat para comenzar
    </div>
  );
}

function Messages() {
  const {
    // del contexto nuevo
    visibleMessages,            // <- array ya resuelto (activeMessages o mock)
    activeConversationId,       // si hay conv backend activa
    deleteMessageBackend,       // borrar en backend
    editMessageBackend,         // editar en backend

    // legacy para modo mock
    eliminarMensaje,            // borrar local mock
  } = useContext(ChatContext);

  // normalizamos TODOS los mensajes que vamos a mostrar
  const list = useMemo(() => {
    return (visibleMessages || []).map(normalizeMessage);
  }, [visibleMessages]);

  // handler para eliminar mensaje (decide si es backend o mock)
  const handleEliminar = (id) => {
    if (activeConversationId) {
      // estoy en conversación real (DB)
      deleteMessageBackend?.(id);
    } else {
      // estoy en contacto mock
      eliminarMensaje?.(id);
    }
  };

  // handler para editar mensaje (sólo tiene sentido si estamos en backend)
  const handleEditar = (id, newText) => {
    if (!activeConversationId) return; // en mock no editamos
    editMessageBackend?.(id, newText);
  };

  if (!list || list.length === 0) {
    return <EmptyChat />;
  }

  return (
    <div className="contenedor-mensajes">
      {list.map((message) => (
        <Message
          key={message.id}
          message={message}
          eliminarMensaje={handleEliminar}
          editarMensaje={handleEditar}
          // le pasamos si se puede editar (solo "YO" y solo si hay conv backend)
          canEdit={message.emisor === "YO" && !!activeConversationId}
        />
      ))}
    </div>
  );
}

export default Messages;
