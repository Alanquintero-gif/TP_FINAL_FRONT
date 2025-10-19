import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatContext } from '../../Context/ChatContext';
import { ContactContext } from '../../Context/ContactContext';
import conversationsService from '../../services/conversationsService';
import participantsMap from '../../config/participantsMap';
import Messages from '../../Components/Messages/Messages';
import FormMessage from '../../Components/Form/FormMessages';
import Loader from '../../Components/Loader/Loader';

export default function ContactDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setContactoActivo, selectConversation, loadMessages } = useContext(ChatContext);
  const { contacts } = useContext(ContactContext);
  const [isLoading, setIsLoading] = useState(true);

  const isNumericId = /^\d+$/.test(id);
  const contacto = isNumericId ? contacts.find(c => c.id === parseInt(id, 10)) : null;

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    (async () => {
      try {
        if (isNumericId) {
          if (!contacto) { if (!cancelled) setIsLoading(false); return; }

          setContactoActivo(contacto.name);

          const participantId = participantsMap[contacto.name];
          if (!participantId) {
            console.warn(`[contact→conv] Falta participantId para "${contacto.name}" en participantsMap.js`);
            if (!cancelled) setIsLoading(false);
            return;
          }

          const conv = await conversationsService.open(participantId);
          const convId = conv?._id;
          if (!convId) { if (!cancelled) setIsLoading(false); return; }

          selectConversation(convId);
          await loadMessages(convId);

          if (!cancelled) navigate(`/app/chat/${convId}`, { replace: true });
        } else {
          selectConversation(id);
          await loadMessages(id);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => { cancelled = true; };
  // deps sólo por id y nombre para evitar loops
  }, [id, isNumericId, contacto?.name, setContactoActivo, selectConversation, loadMessages, navigate]);

  if (isLoading) {
    return (
      <div className="loader-fullscreen">
        <Loader />
      </div>
    );
  }

  if (isNumericId && !contacto) {
    return <div>Contacto no encontrado</div>;
  }

  return (
    <div className="app">
      <Messages />
      <FormMessage />
    </div>
  );
}
