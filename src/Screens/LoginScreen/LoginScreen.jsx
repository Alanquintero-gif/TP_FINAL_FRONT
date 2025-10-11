import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch.jsx'
import useForm from '../../hooks/useForm.jsx'
import { login } from '../../services/authService.js'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css' // <-- nuevo CSS compartido
import { FaWhatsapp } from "react-icons/fa"; 

const FORM_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password'
}

const initial_form_state = {
  [FORM_FIELDS.EMAIL]: '',
  [FORM_FIELDS.PASSWORD]: ''
}

export const LoginScreen = () => {
  const navigate = useNavigate()
  const { sendRequest, loading, response, error } = useFetch()

  const onLogin = (form_state) => {
    sendRequest(() =>
      login(
        form_state[FORM_FIELDS.EMAIL],
        form_state[FORM_FIELDS.PASSWORD]
      )
    )
  }

  useEffect(() => {
    if (!response) return
    const token =
      response.authorization_token ||
      response.token ||
      response.data?.authorization_token ||
      response.data?.token
    if (token) {
      localStorage.setItem('auth_token', token)
      navigate('/app', { replace: true })
    }
  }, [response, navigate])

  const {
    form_state: login_form_state,
    handleSubmit,
    handleInputChange
  } = useForm({ initial_form_state, onSubmit: onLogin })

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo"><FaWhatsapp size={48} color="#25D366" /></div>
          <h1 className="auth-title">Iniciar sesión</h1>
          <p className="auth-subtitle">Bienvenido/a de nuevo</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor={FORM_FIELDS.EMAIL} className="form-label">Email</label>
            <input
              className="form-input"
              name={FORM_FIELDS.EMAIL}
              id={FORM_FIELDS.EMAIL}
              type="email"
              placeholder="tu@correo.com"
              onChange={handleInputChange}
              value={login_form_state[FORM_FIELDS.EMAIL]}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={FORM_FIELDS.PASSWORD} className="form-label">Contraseña</label>
            <input
              className="form-input"
              name={FORM_FIELDS.PASSWORD}
              id={FORM_FIELDS.PASSWORD}
              type="password"
              placeholder="••••••••"
              onChange={handleInputChange}
              value={login_form_state[FORM_FIELDS.PASSWORD]}
              required
            />
          </div>

          {error && <div className="form-error">{error.message}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Iniciando sesión…' : 'Entrar'}
          </button>
        </form>

        <div className="auth-footer">
          <span>¿No tenés cuenta?</span>
          <Link to="/register" className="auth-link">Crear una cuenta</Link>
        </div>
      </div>
    </div>
  )
}
