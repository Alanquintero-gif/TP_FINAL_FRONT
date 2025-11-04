import React from "react";
import { Link } from "react-router-dom";
import "./ContactItem.css";

export default function ContactItem({
  name,
  id,
  last_time_connected,
  img,
  last_message,
  unread_messages,
  logoutItem = false,
  onLogoutClick,
}) {
  if (logoutItem) {
    return (
      <button
        className="contact-link"
        onClick={onLogoutClick}
        style={{
          background: "transparent",
          border: "none",
          width: "100%",
          textAlign: "left",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <div className="contact-item">
          <img
            src={img || "https://cdn-icons-png.flaticon.com/512/1828/1828490.png"}
            alt="Cerrar sesión"
            className="contact-img"
            style={{ objectFit: "contain", backgroundColor: "#242626" }}
          />
          <div className="contact-content">
            <div className="contact-header">
              <h3 className="contact-name" style={{ color: "#ff5252" }}>
                Cerrar sesión
              </h3>
              <span className="contact-time" style={{ color: "#ccc" }}>
                ahora
              </span>
            </div>
            <div className="contact-footer">
              <p
                className="contact-message"
                style={{ color: "#aaa", fontStyle: "italic" }}
              >
                Salir de la cuenta actual
              </p>
            </div>
          </div>
        </div>
      </button>
    );
  }

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
            <p className="contact-message">
              {last_message?.text || last_message || ""}
            </p>
            {unread_messages > 0 && (
              <span className="contact-unread">{unread_messages}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
