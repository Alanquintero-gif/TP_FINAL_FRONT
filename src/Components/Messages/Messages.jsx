import React, { useContext, useMemo } from "react";
import { ChatContext } from "../../Context/ChatContext";
import Message from "./Message";
import "./Messages.css";

function formatHHMM(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d)) return "";
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}


function normalizeMessage(raw) {
  const id = raw._id || raw.id;

  const texto =
    raw.text ||
    raw.texto ||
    raw.body ||
    raw.content ||
    "" ;

  const hora =
    raw.hora ||
    formatHHMM(raw.createdAt || raw.timestamp || Date.now());


  const soyYo =
    raw.emisor === "YO" ||
    raw.fromMe === true ||
    raw.isMine === true ||
    raw.sender === "me" ||
    raw.sender === "YO";

  const emisor = soyYo ? "YO" : "USUARIO";

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
    visibleMessages,            
    activeConversationId,       
    deleteMessageBackend,       
    editMessageBackend,         

    eliminarMensaje,            
  } = useContext(ChatContext);

  const list = useMemo(() => {
    return (visibleMessages || []).map(normalizeMessage);
  }, [visibleMessages]);

  const handleEliminar = (id) => {
    if (activeConversationId) {
      deleteMessageBackend?.(id);
    } else {
      eliminarMensaje?.(id);
    }
  };

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
          canEdit={message.emisor === "YO" && !!activeConversationId}
        />
      ))}
    </div>
  );
}

export default Messages;
