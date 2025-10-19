// src/Components/Messages/Messages.jsx
import React, { useContext, useMemo } from "react";
import Message from "./Message";
import { ChatContext } from "../../Context/ChatContext";
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

// Adaptamos mensajes del backend al formato que espera <Message />
function normalizeBackendMessage(m) {
  const id = m._id || m.id;
  const texto = m.text || m.body || m.content || m.texto || "";
  const hora =
    m.hora ||
    formatHHMM(m.createdAt || m.timestamp || m.date || Date.now());

  // Heurística para “quién envía”
  // - si la API marca fromMe / sender === 'me' / emisor === 'YO' → YO
  // - caso contrario → USUARIO
  const soyYo =
    m.fromMe === true ||
    m.sender === "me" ||
    m.emisor === "YO" ||
    m.isMine === true;

  const emisor = soyYo ? "YO" : "USUARIO";

  // Status opcional: si no viene, mostramos “visto” como antes
  const status = m.status || "visto";

  return { id, texto, hora, emisor, status };
}

function Messages() {
  const {
    // backend
    activeConversationId,
    activeMessages,
    deleteMessageBackend,
    // legacy
    messages,
    contactoActivo,
    eliminarMensaje,
  } = useContext(ChatContext);

  // Lista a mostrar:
  // - si hay conversación activa (backend) → normalizamos y usamos esa
  // - si no, usamos la lista legacy basada en contactoActivo
  const list = useMemo(() => {
    if (activeConversationId) {
      return (activeMessages || []).map(normalizeBackendMessage);
    }
    if (!contactoActivo) return [];
    return messages?.[contactoActivo] || [];
  }, [activeConversationId, activeMessages, contactoActivo, messages]);

  // Handler de borrar compatible con ambos mundos:
  const handleEliminar = (id) => {
    if (activeConversationId) {
      // backend
      deleteMessageBackend?.(id);
    } else {
      // legacy
      eliminarMensaje?.(id);
    }
  };

  // Si no hay nada seleccionado (legacy) y tampoco conv activa, mostramos vacío
  if (!activeConversationId && !contactoActivo) {
    return <EmptyChat />;
  }

  return (
    <div className="contenedor-mensajes">
      {list.map((message) => (
        <Message
          key={message.id}
          message={message}
          eliminarMensaje={handleEliminar}
        />
      ))}
    </div>
  );
}

// Componente vacío minimal (si ya tenías uno, podés mantener el tuyo)
function EmptyChat() {
  return (
    <div className="contenedor-mensajes" style={{ opacity: 0.6, padding: 16 }}>
      Seleccioná un chat para comenzar
    </div>
  );
}

export default Messages;
