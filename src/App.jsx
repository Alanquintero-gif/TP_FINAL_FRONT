import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import { LoginScreen } from './Screens/LoginScreen/LoginScreen'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import LayoutWpp from './Screens/MainScreen/LayoutWpp'
import ContactDetailScreen from './Screens/ContactDetailScreen/ContactDetailScreen'
import Loader from './Components/Loader/Loader'
import ContactInfoScreen from './Components/ContactInfoScreen/ContactInfoScreen'

const LayoutEmpty = () => (
  <div style={{ padding: 24 }}>

  </div>
)

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* raíz -> login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* públicas */}
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* protegidas */}
      <Route element={<AuthMiddleware />}>
        <Route path="/app" element={<LayoutWpp />}>
          <Route index element={<div style={{padding:24}} />} />
          <Route path="chat/:id" element={<ContactDetailScreen />} />
          <Route path="contact-info/:id" element={<ContactInfoScreen />} />
        </Route>
      </Route>

      {/* catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
