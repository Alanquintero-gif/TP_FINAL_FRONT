import ENVIRONMENT from "../config/environment";

const BASE = `${ENV.URL_API}/api/messages`
const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}` })

export const listMessages = async (conversationId) => {
  const r = await fetch(`${BASE}/${conversationId}`, { headers: authHeaders() })
  if (!r.ok) throw new Error('No se pudieron cargar mensajes')
  return r.json()
}

export const sendMessage = async (conversationId, text) => {
  const r = await fetch(`${BASE}/${conversationId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ text })
  })
  if (!r.ok) throw new Error('No se pudo enviar el mensaje')
  return r.json()
}

export const deleteMessage = async (messageId) => {
  const r = await fetch(`${ENV.URL_API}/api/messages/${messageId}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
  if (!r.ok && r.status !== 204) throw new Error('No se pudo borrar el mensaje')
  return true
}
