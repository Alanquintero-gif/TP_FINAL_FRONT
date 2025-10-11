import React, { useContext, useState } from "react";
import ContactItem from "../ContactItem/ContactItem";
import { ContactContext } from "../../Context/ContactContext";
import { CiMenuBurger } from "react-icons/ci";
import "./ContactsList.css"; 

const ContactsList = () => {
    const { contacts } = useContext(ContactContext);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="contacts-list-container">
            <div className="contacts-header">
                <h3 className="app-title">Whatsapp</h3>
                <button className="menu-button">
                    <CiMenuBurger />
                </button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar contacto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {filteredContacts.map((contact) => (
                <ContactItem
                    key={contact.id}
                    id={contact.id}
                    name={contact.name}
                    last_time_connected={contact.last_time_connected}
                    img={contact.img}
                    last_message={contact.last_message}
                    unread_messages={contact.unread_messages}
                />
            ))}
        </div>
    );
};

export default ContactsList;