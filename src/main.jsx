import react from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChatProvider } from './Context/ChatContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContactContextProvider, { ContactContext } from './Context/ContactContext.jsx'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <ContactContextProvider>
    <ChatProvider> 
      <App />
    </ChatProvider>
  </ContactContextProvider>
</BrowserRouter>
)
