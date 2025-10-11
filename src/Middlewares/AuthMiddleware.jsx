import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AuthMiddleware = () => {
  const auth_token = localStorage.getItem('auth_token')
  return auth_token ? <Outlet /> : <Navigate to="/login" replace />
}

export default AuthMiddleware