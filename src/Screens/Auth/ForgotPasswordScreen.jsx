import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import ENVIRONMENT from "./../../config/environment";
import './../LoginScreen/Auth.css' 

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${ENVIRONMENT.URL_API}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      await res.json(); 
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="pw-container">
      <div className="pw-card">
        <h2 className="pw-title">Recuperar contraseña</h2>

        {sent ? (
          <p className="pw-info">
            Si el correo existe, te enviamos un enlace para restablecer tu contraseña.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              className="form-input"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="auth-button">Enviar enlace</button>
          </form>
        )}

        <div className="auth-footer">
          <Link className="auth-link" to="/login">Volver al inicio de sesión</Link>
        </div>
      </div>
    </div>
  );
}