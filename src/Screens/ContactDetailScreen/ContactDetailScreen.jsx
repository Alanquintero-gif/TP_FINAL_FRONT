import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChatContext } from '../../Context/ChatContext';
import { ContactContext } from '../../Context/ContactContext';
import Messages from '../../Components/Messages/Messages';
import FormMessage from '../../Components/Form/FormMessages';
import Loader from '../../Components/Loader/Loader';


export default function ContactDetailScreen() {
  const { id } = useParams();
  const { contacts } = useContext(ContactContext);
  const { setContactoActivo } = useContext(ChatContext);
  const [isLoading, setIsLoading] = useState(true);
  const contacto = contacts.find(c => c.id === parseInt(id));

  useEffect(() => {
    setIsLoading(true);
    
    if (contacto) {
      setContactoActivo(contacto.name);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [id, contacto, setContactoActivo]); 

  if (isLoading) {
    return (
      <div className="loader-fullscreen">
        <Loader />
      </div>
    );
  }

  if (!contacto) return <div>Contacto no encontrado</div>;

  return (
    <div className="app">
      <Messages />
      <FormMessage />
    </div>
  );
}