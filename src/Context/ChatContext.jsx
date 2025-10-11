import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState({
    "Jorge Luis Borges": [
      { emisor: 'YO', hora: '14:18', id: 1, texto: 'Jorge, estoy desencantado con la escritura. Siempre soñé con estar en tu posición, pero, por alguna extraña razón, siento que nos estamos alejando. ', status: 'visto' }
      ,{ emisor: 'USUARIO', hora: '14:19', id: 2, texto: 'Uno no es lo que es por lo que escribe, sino por lo que ha leído.', status: 'visto' }
      
    ],
    "Julio Cortázar": [
      { emisor: 'YO', hora: '13:30', id: 3, texto: 'Me voy a dormir una siesta', status: 'visto' },
      { emisor: 'USUARIO', hora: '15:03', id: 4, texto: 'Lo malo es eso que llaman despertarse', status: 'visto' }
      
    ],
    "Alfonsina Storni": [{ emisor: 'USUARIO', hora: '13:22', id: 5, texto: 'Hombre pequeñito...', status: 'visto' }
    ],
    "Roberto Arlt": [     { emisor: 'YO', hora: '14: 20', id: 1, texto: 'Roberto, qué futuro nos depara? ', status: 'visto' } 
      ,{ emisor: 'USUARIO', hora: '18:47', id:6, texto: 'El futuro es nuestro por prepotencia de trabajo.', status: 'visto' }
    ],
    "Alejandra Pizarnik": [      { emisor: 'USUARIO', hora: '16:01', id:7, texto: 'Yo moriría por vos. Vos, ¿vivirías por mí?', status: 'visto' }
    ],
    "Rodolfo Walsh": [ { emisor: 'YO', hora: '10:30', id: 1, texto: 'Rodolfo, te enteraste de las nuevas guerras que hay en el mundo? ', status: 'visto' }
      ,{ emisor: 'USUARIO', hora: '12:33', id:8, texto: 'Sólo un débil mental puede no desear la paz.', status: 'visto' }],
    "José Hernández": [ { emisor: 'USUARIO', hora: '11:11', id: 9, texto: 'Los hermanos sean unidos...', status: 'visto' }],
    "Sarmiento": [ { emisor: 'YO', hora: '14:18', id: 1, texto: 'Jorge, estoy desencantado con la escritura. Siempre soñé con estar en tu posición, pero, por alguna extraña razón, siento que nos estamos alejando. ', status: 'visto' },
      { emisor: 'USUARIO', hora: '19:45', id: 10, texto: 'Todos los problemas son problemas de educación.', status: 'visto' }],
    "Oliverio Girondo": [ { emisor: 'USUARIO', hora: '10:02', id: 11, texto: 'la costumbre nos teje diariamente una telaraña en las pupilas.', status: 'visto' }]
  });

  const [contactoActivo, setContactoActivo] = useState(null);

  const eliminarMensaje = (id) => {
    if (!contactoActivo) return;
    
    setMessages(prev => {
      const nuevosMensajes = {
        ...prev,
        [contactoActivo]: prev[contactoActivo].filter(m => m.id !== id)
      };
      return nuevosMensajes;
    });
  };

  const agregarMensaje = (event) => {
    event.preventDefault();
    const texto = event.target.texto.value.trim();

    if (!texto || !contactoActivo) return;

    const nuevoMensaje = {
      emisor: 'YO',
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: Date.now(), 
      texto,
      status: 'no-recibido'
    };

    setMessages(prev => ({
      ...prev,
      [contactoActivo]: [...(prev[contactoActivo] || []), nuevoMensaje]
    }));

    event.target.reset();
  };



  return (
    <ChatContext.Provider
      value={{
        messages,
        contactoActivo,
        setContactoActivo,
        eliminarMensaje,
        agregarMensaje,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}