import React from 'react'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router-dom'
import './../LoginScreen/Auth.css' 
import { FaWhatsapp } from "react-icons/fa"; 


const FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password'
}
const initial_form_state = {
  [FORM_FIELDS.NAME]: '',
  [FORM_FIELDS.EMAIL]: '',
  [FORM_FIELDS.PASSWORD]: ''
}

const RegisterScreen = () => {
  const { sendRequest, loading, response, error } = useFetch()

  const onRegister = (form_state) => {
    sendRequest(() => register(
      form_state[FORM_FIELDS.NAME],
      form_state[FORM_FIELDS.EMAIL],
      form_state[FORM_FIELDS.PASSWORD]
    ))
  }

  const {
    form_state: register_form_state,
    handleSubmit,
    handleInputChange
  } = useForm({ initial_form_state, onSubmit: onRegister })

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo"><FaWhatsapp size={48} color="#25D366" /></div>
          <h1 className="auth-title">Crear cuenta</h1>
          <p className="auth-subtitle">Unite a la conversación</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor={FORM_FIELDS.NAME} className="form-label">Nombre</label>
            <input
              className="form-input"
              name={FORM_FIELDS.NAME}
              id={FORM_FIELDS.NAME}
              type="text"
              placeholder="Tu nombre"
              onChange={handleInputChange}
              value={register_form_state[FORM_FIELDS.NAME]}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={FORM_FIELDS.EMAIL} className="form-label">Email</label>
            <input
              className="form-input"
              name={FORM_FIELDS.EMAIL}
              id={FORM_FIELDS.EMAIL}
              type="email"
              placeholder="tu@correo.com"
              onChange={handleInputChange}
              value={register_form_state[FORM_FIELDS.EMAIL]}
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
              placeholder="Mínimo 8 caracteres"
              onChange={handleInputChange}
              value={register_form_state[FORM_FIELDS.PASSWORD]}
              required
            />
          </div>

          {error && <div className="form-error">{error.message}</div>}
          {response && <div className="form-success">Usuario registrado</div>}

          <button type="submit" className="auth-button" disabled={loading || !!response}>
            {loading ? 'Creando cuenta…' : response ? 'Registrado' : 'Registrarse'}
          </button>
        </form>

        <div className="auth-footer">
          <span>¿Ya tenés cuenta?</span>
          <Link to="/login" className="auth-link">Iniciar sesión</Link>
        </div>
                          <div className='auth-footer'>
          <Link to="/forgot-password" className="auth-link">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
