import React, { useContext } from 'react';
import { ChatContext } from '../../Context/ChatContext';

function FormMessage() {
  const { agregarMensaje } = useContext(ChatContext);

  return (
    <form onSubmit={agregarMensaje} className='form'>
      <input
        name="texto"
        placeholder="Escribe tu mensaje..."
        required
      />
      <button type="submit">
        Enviar
      </button>
    </form>
  );
}

export default FormMessage;
