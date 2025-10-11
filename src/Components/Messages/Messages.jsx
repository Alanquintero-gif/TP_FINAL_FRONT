import React, { useContext } from "react";
import Message from "./Message";
import { ChatContext } from "../../Context/ChatContext";
import "./Messages.css";

function Messages() {
  const { messages, contactoActivo, eliminarMensaje } = useContext(ChatContext);

  if (!contactoActivo) return <EmptyChat />;

  const mensajesActuales = messages[contactoActivo] || [];

  return (
    <div className="contenedor-mensajes">
      {mensajesActuales.map((message) => (
        <Message 
          key={message.id} 
          message={message} 
          eliminarMensaje={eliminarMensaje} 
        />
      ))}
    </div>
  );
}

export default Messages;