import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import ENVIRONMENT from "./../../config/environment";
import './../LoginScreen/Auth.css' // <-- mismo CSS

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${ENVIRONMENT.URL_API}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      await response.json();
      setSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Recuperar contraseña</h2>
        {sent ? (
          <p style={{ color: "#25d366" }}>
            Si el correo existe, te enviamos un enlace para restablecer tu contraseña.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Enviar enlace</button>
          </form>
        )}
        <div className="auth-footer">
          <Link to="/login">Volver al inicio de sesión</Link>
        </div>
      </div>
    </div>
  );
}
