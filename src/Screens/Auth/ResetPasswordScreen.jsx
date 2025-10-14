import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import ENVIRONMENT from "./../../config/environment";
import './../LoginScreen/Auth.css' 

export default function ResetPasswordScreen() {
  const [sp] = useSearchParams();
  const token = sp.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) { setValid(false); return; }
    (async () => {
      try {
        const res = await fetch(`${ENVIRONMENT.URL_API}/api/auth/reset-password/${token}`);
        const data = await res.json();
        setValid(!!data.valid);
      } catch {
        setValid(false);
      }
    })();
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) return alert("La contraseña debe tener al menos 8 caracteres.");
    if (password !== confirm) return alert("Las contraseñas no coinciden.");

    setLoading(true);
    try {
      const res = await fetch(`${ENVIRONMENT.URL_API}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Error al restablecer la contraseña.");
      alert("Contraseña actualizada correctamente.");
      navigate("/login");
    } catch {
      alert("Error del servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!token) {
    return (
      <div className="pw-container">
        <div className="pw-card">
          <h2 className="pw-title">Restablecer contraseña</h2>
          <p className="pw-error">Falta el token en la URL.</p>
          <div className="pw-footer">
            <Link className="pw-link" to="/forgot-password">Volver a solicitar enlace</Link>
          </div>
        </div>
      </div>
    );
  }

  if (valid === null) {
    return (
      <div className="pw-container">
        <div className="pw-card">
          <h2 className="pw-title">Validando token...</h2>
        </div>
      </div>
    );
  }

  if (valid === false) {
    return (
      <div className="pw-container">
        <div className="pw-card">
          <h2 className="pw-title">Enlace inválido o expirado</h2>
          <div className="pw-footer">
            <Link className="pw-link" to="/forgot-password">Volver a solicitar enlace</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pw-container">
      <div className="pw-card">
        <h2 className="pw-title">Restablecer contraseña</h2>
        <form onSubmit={onSubmit} className="auth-form">
          <input
            className="form-input"
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={8}
          />
          <button type="submit" className="auth-button">Guardar nueva contraseña</button>
        </form>
        <div className="auth-footer">
          <Link className="auth-link" to="/login">Volver al inicio de sesión</Link>
        </div>
      </div>
    </div>
  );
}
