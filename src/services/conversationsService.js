import ENVIRONMENT from "../config/environment";

const BASE = `${ENV.URL_API}/api/conversations`

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`
})

export const listConversations = async () => {
  const r = await fetch(BASE, { headers: authHeaders() })
  if (!r.ok) throw new Error('No se pudieron cargar conversaciones')
  return r.json()
}

// participantId = _id del “usuario virtual” que representa a tu contacto fijo
export const openConversation = async (participantId) => {
  const r = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ participantId })
  })
  if (!r.ok) throw new Error('No se pudo abrir la conversación')
  return r.json()
}
