import React, { createContext, useMemo, useState, useCallback } from "react";

// Services (backend real)
import conversationsService from "../services/conversationsService";
import messagesService from "../services/messagesService";

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  // -----------------------------
  // NUEVO: Estado para backend
  // -----------------------------
  const [conversations, setConversations] = useState([]);                 // Lista de conversaciones del usuario
  const [activeConversationId, setActiveConversationId] = useState(null); // Conversación activa por _id
  const [messagesByConv, setMessagesByConv] = useState(new Map());        // Map<conversationId, Message[]>
  const [fetchingConversations, setFetchingConversations] = useState(false);
  const [fetchingMessages, setFetchingMessages] = useState(false);

  // -----------------------------
  // LEGACY (compat de UI actual)
  // -----------------------------
  // Conservamos la API anterior para no romper nada mientras migramos.
  const [messages, setMessages] = useState({
    "Jorge Luis Borges": [
      { emisor: "YO", hora: "14:18", id: 1, texto: "Jorge, estoy desencantado con la escritura. Siempre soñé con estar en tu posición, pero, por alguna extraña razón, siento que nos estamos alejando. ", status: "visto" },
      { emisor: "USUARIO", hora: "14:19", id: 2, texto: "Uno no es lo que es por lo que escribe, sino por lo que ha leído.", status: "visto" }
    ],
    "Julio Cortázar": [
      { emisor: "YO", hora: "13:30", id: 3, texto: "Me voy a dormir una siesta", status: "visto" },
      { emisor: "USUARIO", hora: "15:03", id: 4, texto: "Lo malo es eso que llaman despertarse", status: "visto" }
    ],
    "Alfonsina Storni": [{ emisor: "USUARIO", hora: "13:22", id: 5, texto: "Hombre pequeñito...", status: "visto" }],
    "Roberto Arlt": [
      { emisor: "YO", hora: "14: 20", id: 1, texto: "Roberto, qué futuro nos depara? ", status: "visto" },
      { emisor: "USUARIO", hora: "18:47", id: 6, texto: "El futuro es nuestro por prepotencia de trabajo.", status: "visto" }
    ],
    "Alejandra Pizarnik": [{ emisor: "USUARIO", hora: "16:01", id: 7, texto: "Yo moriría por vos. Vos, ¿vivirías por mí?", status: "visto" }],
    "Rodolfo Walsh": [
      { emisor: "YO", hora: "10:30", id: 1, texto: "Rodolfo, te enteraste de las nuevas guerras que hay en el mundo? ", status: "visto" },
      { emisor: "USUARIO", hora: "12:33", id: 8, texto: "Sólo un débil mental puede no desear la paz.", status: "visto" }
    ],
    "José Hernández": [{ emisor: "USUARIO", hora: "11:11", id: 9, texto: "Los hermanos sean unidos...", status: "visto" }],
    "Sarmiento": [
      { emisor: "YO", hora: "14:18", id: 1, texto: "Jorge, estoy desencantado con la escritura. Siempre soñé con estar en tu posición, pero, por alguna extraña razón, siento que nos estamos alejando. ", status: "visto" },
      { emisor: "USUARIO", hora: "19:45", id: 10, texto: "Todos los problemas son problemas de educación.", status: "visto" }
    ],
    "Oliverio Girondo": [{ emisor: "USUARIO", hora: "10:02", id: 11, texto: "la costumbre nos teje diariamente una telaraña en las pupilas.", status: "visto" }]
  });

  // En la UI actual, contactoActivo es un "nombre de contacto" (string).
  const [contactoActivo, setContactoActivo] = useState(null);

  // -----------------------------
  // Helpers
  // -----------------------------
  const nowHHMM = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // -----------------------------
  // Acciones (Backend) — MEMOIZADAS
  // -----------------------------
  const loadConversations = useCallback(async () => {
    setFetchingConversations(true);
    try {
      const list = await conversationsService.list();
      setConversations(list);
    } catch (err) {
      console.error("[chat] loadConversations", err);
    } finally {
      setFetchingConversations(false);
    }
  }, []);

  const selectConversation = useCallback((conversationId) => {
    const val = conversationId || null;
    setActiveConversationId(val);
    // 👉 recordamos la última conversación real
    if (val) localStorage.setItem("last_conversation_id", val);
  }, []);

  const loadMessages = useCallback(async (conversationId) => {
    if (!conversationId) return;
    setFetchingMessages(true);
    try {
      const arr = await messagesService.list(conversationId);
      setMessagesByConv((prev) => {
        const next = new Map(prev);
        next.set(conversationId, arr);
        return next;
      });
    } catch (err) {
      console.error("[chat] loadMessages", err);
    } finally {
      setFetchingMessages(false);
    }
  }, []);

  const sendMessage = useCallback(async (conversationId, text) => {
    if (!conversationId || !text?.trim()) return null;
    const created = await messagesService.send(conversationId, text.trim());
    setMessagesByConv((prev) => {
      const next = new Map(prev);
      const arr = next.get(conversationId) || [];
      next.set(conversationId, [...arr, created]);
      return next;
    });
    return created;
  }, []);

  const deleteMessageBackend = useCallback(async (messageId) => {
    if (!messageId) return false;
    try {
      await messagesService.remove(messageId);
      // quitar de messagesByConv si lo tenemos cargado
      setMessagesByConv((prev) => {
        const next = new Map(prev);
        for (const [convId, arr] of next.entries()) {
          const idx = arr.findIndex((m) => String(m._id) === String(messageId));
          if (idx >= 0) {
            const copy = arr.slice();
            copy.splice(idx, 1);
            next.set(convId, copy);
            break;
          }
        }
        return next;
      });
      return true;
    } catch (e) {
      console.error("[chat] deleteMessageBackend", e);
      return false;
    }
  }, []);

  // -----------------------------
  // Acciones (Legacy UI)
  // -----------------------------
  // Eliminar mensaje por id en el diccionario legacy.
  const eliminarMensaje = useCallback((id) => {
    if (!contactoActivo) return;
    setMessages((prev) => {
      const nuevosMensajes = {
        ...prev,
        [contactoActivo]: prev[contactoActivo].filter((m) => m.id !== id)
      };
      return nuevosMensajes;
    });
  }, [contactoActivo]);

  // Agregar mensaje desde el form legacy (event.target.texto)
  // Si hay activeConversationId, también envía al backend.
  const agregarMensaje = useCallback(async (event) => {
    event.preventDefault?.();

    const texto =
      event?.target?.texto?.value?.trim?.() ??
      (typeof event === "string" ? event.trim() : "");

    if (!texto) return;

    // 1) Compat local (UI actual)
    if (contactoActivo) {
      const nuevoMensaje = {
        emisor: "YO",
        hora: nowHHMM(),
        id: Date.now(),
        texto,
        status: "no-recibido"
      };
      setMessages((prev) => ({
        ...prev,
        [contactoActivo]: [...(prev[contactoActivo] || []), nuevoMensaje]
      }));
    }

    // 2) Persistir en backend si hay conversación activa
    if (activeConversationId) {
      try {
        await sendMessage(activeConversationId, texto);
      } catch (e) {
        console.error("[chat] agregarMensaje → sendMessage", e);
      }
    }

    // reset del form legacy
    if (event?.target?.reset) event.target.reset();
  }, [contactoActivo, activeConversationId, sendMessage]);

  // -----------------------------
  // Derivados útiles
  // -----------------------------
  const activeMessages = useMemo(() => {
    if (!activeConversationId) return [];
    return messagesByConv.get(activeConversationId) || [];
  }, [activeConversationId, messagesByConv]);

  // -----------------------------
  // Context value
  // -----------------------------
  const value = {
    // NUEVO (backend)
    conversations,
    activeConversationId,
    fetchingConversations,
    fetchingMessages,
    messagesByConv,
    activeMessages,           // mensajes de la conversación activa (array)
    loadConversations,
    selectConversation,
    loadMessages,
    sendMessage,
    deleteMessageBackend,

    // LEGACY (para no romper la UI actual)
    messages,
    contactoActivo,
    setContactoActivo,
    eliminarMensaje,
    agregarMensaje
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
