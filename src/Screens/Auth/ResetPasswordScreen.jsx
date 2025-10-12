import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import ENVIRONMENT from "./../../config/environment";
import './../LoginScreen/Auth.css' // <-- mismo CSS

export default function ResetPasswordScreen() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await fetch(`${ENVIRONMENT.URL_API}/api/auth/reset-password/${token}`);
        const data = await res.json();
        setValid(data.valid);
      } catch {
        setValid(false);
      }
    };
    if (token) validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return alert("Las contraseñas no coinciden.");
    setLoading(true);
    try {
      const res = await fetch(`${ENVIRONMENT.URL_API}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Contraseña actualizada correctamente.");
        navigate("/login");
      } else {
        alert(data.message || "Error al restablecer la contraseña.");
      }
    } catch (error) {
      alert("Error del servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (valid === null) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Validando token...</h2>
        </div>
      </div>
    );
  }

  if (valid === false) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Enlace inválido o expirado</h2>
          <Link to="/forgot-password">Volver a solicitar enlace</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Restablecer contraseña</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button type="submit">Guardar nueva contraseña</button>
        </form>
      </div>
    </div>
  );
}
