import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
} from "react";

import conversationsService from "../services/conversationsService";
import messagesService from "../services/messagesService";

export const ChatContext = createContext();

export function ChatProvider({ children }) {

  const [conversations, setConversations] = useState([]); // lista de conversaciones del usuario logueado
  const [activeConversationId, setActiveConversationId] = useState(null); // _id de la conversación activa
  const [activeMessages, setActiveMessages] = useState([]); // mensajes de ESA conversación activa

  const [fetchingConversations, setFetchingConversations] = useState(false);
  const [fetchingMessages, setFetchingMessages] = useState(false);


  const [messages, setMessages] = useState({
    "Jorge Luis Borges": [
      {
        emisor: "YO",
        hora: "14:18",
        id: 1,
        texto:
          "Jorge, estoy desencantado con la escritura. Siempre soñé con estar en tu posición, pero, por alguna extraña razón, siento que nos estamos alejando. ",
        status: "visto",
      },
      {
        emisor: "USUARIO",
        hora: "14:19",
        id: 2,
        texto:
          "Uno no es lo que es por lo que escribe, sino por lo que ha leído.",
        status: "visto",
      },
    ],
    "Julio Cortázar": [
      {
        emisor: "YO",
        hora: "13:30",
        id: 3,
        texto: "Me voy a dormir una siesta",
        status: "visto",
      },
      {
        emisor: "USUARIO",
        hora: "15:03",
        id: 4,
        texto: "Lo malo es eso que llaman despertarse",
        status: "visto",
      },
    ],
    "Alfonsina Storni": [
      {
        emisor: "USUARIO",
        hora: "13:22",
        id: 5,
        texto: "Hombre pequeñito...",
        status: "visto",
      },
    ],
    "Roberto Arlt": [
      {
        emisor: "YO",
        hora: "14: 20",
        id: 1,
        texto: "Roberto, qué futuro nos depara? ",
        status: "visto",
      },
      {
        emisor: "USUARIO",
        hora: "18:47",
        id: 6,
        texto: "El futuro es nuestro por prepotencia de trabajo.",
        status: "visto",
      },
    ],
    "Alejandra Pizarnik": [
      {
        emisor: "USUARIO",
        hora: "16:01",
        id: 7,
        texto: "Yo moriría por vos. Vos, ¿vivirías por mí?",
        status: "visto",
      },
    ],
    "Rodolfo Walsh": [
      {
        emisor: "YO",
        hora: "10:30",
        id: 1,
        texto:
          "Rodolfo, te enteraste de las nuevas guerras que hay en el mundo? ",
        status: "visto",
      },
      {
        emisor: "USUARIO",
        hora: "12:33",
        id: 8,
        texto: "Sólo un débil mental puede no desear la paz.",
        status: "visto",
      },
    ],
    "José Hernández": [
      {
        emisor: "USUARIO",
        hora: "11:11",
        id: 9,
        texto: "Los hermanos sean unidos...",
        status: "visto",
      },
    ],
    Sarmiento: [
      {
        emisor: "YO",
        hora: "14:18",
        id: 1,
        texto:
          "Jorge, estoy desencantado con la escritura. Siempre soñé con estar en tu posición, pero, por alguna extraña razón, siento que nos estamos alejando. ",
        status: "visto",
      },
      {
        emisor: "USUARIO",
        hora: "19:45",
        id: 10,
        texto: "Todos los problemas son problemas de educación.",
        status: "visto",
      },
    ],
    "Oliverio Girondo": [
      {
        emisor: "USUARIO",
        hora: "10:02",
        id: 11,
        texto:
          "la costumbre nos teje diariamente una telaraña en las pupilas.",
        status: "visto",
      },
    ],
  });

  const [contactoActivo, setContactoActivo] = useState(null);

  // util para hora
  const nowHHMM = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });


  const loadConversations = useCallback(async () => {
    setFetchingConversations(true);
    try {
      const list = await conversationsService.list(); // GET /api/conversations
      setConversations(list || []);
    } catch (err) {
      console.error("[chat] loadConversations", err);
    } finally {
      setFetchingConversations(false);
    }
  }, []);

  const selectConversation = useCallback((conversationId) => {
    const val = conversationId || null;
    setActiveConversationId(val);

    if (val) {
      localStorage.setItem("last_conversation_id", val);
    }
  }, []);

  const loadMessages = useCallback(async (conversationId) => {
    if (!conversationId) return;
    setFetchingMessages(true);
    try {
      const arr = await messagesService.list(conversationId); // GET /api/messages/:conversationId
      setActiveMessages(arr || []); 
    } catch (err) {
      console.error("[chat] loadMessages", err);
      setActiveMessages([]);
    } finally {
      setFetchingMessages(false);
    }
  }, []);


  const sendMessage = useCallback(
    async (conversationId, text) => {
      if (!conversationId || !text?.trim()) return null;

      // POST /api/messages/:conversationId
      const created = await messagesService.send(
        conversationId,
        text.trim()
      );

      setActiveMessages((prev) => [...prev, created]);

      setConversations((prevList) =>
        prevList.map((c) =>
          String(c._id) === String(conversationId)
            ? {
                ...c,
                lastMessage: created,
                lastMessageAt: created.createdAt,
              }
            : c
        )
      );

      return created;
    },
    []
  );

  const editMessageBackend = useCallback(
    async (messageId, newText) => {
      if (!messageId || !newText?.trim()) return;

      const updated = await messagesService.edit(
        messageId,
        newText.trim()
      );


      setActiveMessages((prev) =>
        prev.map((m) => {
          const mid = String(m._id || m.id);
          if (mid === String(messageId)) {
            return {
              ...m,
              ...updated,
              text: updated.text || newText.trim(),
              texto: updated.text || newText.trim(), // para la UI que usa "texto"
            };
          }
          return m;
        })
      );

      
      setConversations((prevList) =>
        prevList.map((c) => {
          const lastId =
            c.lastMessage?._id || c.lastMessage?.id || null;
          if (String(lastId) === String(messageId)) {
            return {
              ...c,
              lastMessage: {
                ...c.lastMessage,
                ...updated,
                text: updated.text || newText.trim(),
              },
            };
          }
          return c;
        })
      );
    },
    []
  );

  const deleteMessageBackend = useCallback(async (messageId) => {
    if (!messageId) return false;

    await messagesService.remove(messageId); 

    setActiveMessages((prev) =>
      prev.filter(
        (m) => String(m._id || m.id) !== String(messageId)
      )
    );

    return true;
  }, []);


  const eliminarMensaje = useCallback(
    (id) => {
      if (!contactoActivo) return;
      setMessages((prev) => {
        return {
          ...prev,
          [contactoActivo]: prev[contactoActivo].filter(
            (m) => m.id !== id
          ),
        };
      });
    },
    [contactoActivo]
  );

  const agregarMensaje = useCallback(
    async (event) => {
      event?.preventDefault?.();

      const texto =
        event?.target?.texto?.value?.trim?.() ??
        (typeof event === "string" ? event.trim() : "");

      if (!texto) return;

      // modo local (mock)
      if (contactoActivo) {
        const nuevoMensaje = {
          emisor: "YO",
          hora: nowHHMM(),
          id: Date.now(),
          texto,
          status: "no-recibido",
        };

        setMessages((prev) => ({
          ...prev,
          [contactoActivo]: [
            ...(prev[contactoActivo] || []),
            nuevoMensaje,
          ],
        }));
      }

      if (activeConversationId) {
        try {
          await sendMessage(activeConversationId, texto);
        } catch (e) {
          console.error("[chat] agregarMensaje → sendMessage", e);
        }
      }

      if (event?.target?.reset) event.target.reset();
    },
    [contactoActivo, activeConversationId, sendMessage]
  );


  const visibleMessages = useMemo(() => {
    if (activeConversationId) {
      return activeMessages;
    }
    if (contactoActivo && messages[contactoActivo]) {
      return messages[contactoActivo];
    }
    return [];
  }, [activeConversationId, activeMessages, contactoActivo, messages]);


  const value = {
    // backend real
    conversations,
    activeConversationId,
    fetchingConversations,
    fetchingMessages,
    activeMessages, 
    loadConversations,
    selectConversation,
    loadMessages,
    sendMessage,
    editMessageBackend, 
    deleteMessageBackend,

    messages,
    contactoActivo,
    setContactoActivo,
    eliminarMensaje,
    agregarMensaje,

    visibleMessages,
  };

  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  );
}
