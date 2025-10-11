import React from "react";
import { Link } from "react-router-dom";
import "./ContactItem.css";

const ContactItem = ({ name, id, last_time_connected, img, last_message, unread_messages }) => {
  return (
 <Link to={`/app/chat/${id}`} className="contact-link">
      <div className="contact-item">
        <img src={img} alt={`${name}`} className="contact-img" />
        <div className="contact-content">
          <div className="contact-header">
            <h3 className="contact-name">{name}</h3>
            <span className="contact-time">{last_time_connected}</span>
          </div>
          <div className="contact-footer">
            <p className="contact-message">{last_message.text}</p>
            {unread_messages > 0 && (
              <span className="contact-unread">{unread_messages}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContactItem;