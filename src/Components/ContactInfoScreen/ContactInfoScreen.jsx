import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContactContext } from '../../Context/ContactContext';
import './ContactInfoScreen.css';

export default function ContactInfoScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts } = useContext(ContactContext);
  const contacto = contacts.find(c => c.id === parseInt(id));

  if (!contacto) return <div>Contacto no encontrado</div>;

  const telefono = `+54 9 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="contact-info-container">
      <div className="contact-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
      </div>

      <div className="contact-profile">
        <img src={contacto.img} alt={contacto.name} className="profile-image" />
        <h3 className="profile-name">{contacto.name}</h3>
        <p className="profile-phone">{telefono}</p>
      </div>

      <div className="contact-options">
        <div className="option-item">
          <span>Mensajes destacados</span>
        </div>
        <div className="option-item">
          <span>Silenciar notificaciones</span>
        </div>
        <div className="option-item">
          <span>Mensajes temporales</span>
        </div>
        <div className="option-item">
          <span>Privacidad</span>
        </div>
      </div>
    </div>
  );
}