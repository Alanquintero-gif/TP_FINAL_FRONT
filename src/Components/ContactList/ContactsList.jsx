import React, { useContext, useState } from "react";
import ContactItem from "../ContactItem/ContactItem";
import { ContactContext } from "../../Context/ContactContext";
import { ChatContext } from "../../Context/ChatContext";
import { CiMenuBurger } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "./ContactsList.css";

const ContactsList = () => {
  const { contacts } = useContext(ContactContext);
  const { conversations } = useContext(ChatContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const handleLogoutClick = async () => {
    // 1. borrar token
    await authService.logout();

   
    navigate("/login", { replace: true });
  };

  return (
    <div className="contacts-list-container">
      <div className="contacts-header">
        <h3 className="app-title">Whatsapp</h3>
        <button className="menu-button">
          <CiMenuBurger />
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar contacto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Lista de contactos locales */}
      {filteredContacts.map((contact) => (
        <ContactItem
          key={`mock-${contact.id}`}
          id={contact.id}
          name={contact.name}
          last_time_connected={contact.last_time_connected}
          img={contact.img}
          last_message={contact.last_message}
          unread_messages={contact.unread_messages}
        />
      ))}

      {/* Item especial: Cerrar sesión */}
      <ContactItem
        logoutItem={true}
        onLogoutClick={handleLogoutClick}
        name="Cerrar sesión"
        id="logout"
        last_time_connected=""
        img={null} 
        last_message="Salir de la cuenta actual"
        unread_messages={0}
      />
    </div>
  );
};

export default ContactsList;
