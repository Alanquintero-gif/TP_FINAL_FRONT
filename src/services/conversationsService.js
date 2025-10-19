import ENVIRONMENT from "../config/environment";
import * as authService from "./authService";

const API = ENVIRONMENT.URL_API;

async function authedFetch(path, options = {}) {
  const token =
    authService.getToken?.() ||
    localStorage.getItem("auth_token") ||
    sessionStorage.getItem("auth_token") ||
    "";

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API}${path}`, { ...options, headers });

  // Puede que no siempre haya body
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* ignore */
  }

  if (!res.ok) {
    const message =
      data?.message ||
      (res.status === 401
        ? "No hay header de autorizacion"
        : `HTTP ${res.status}`);
    throw new Error(message);
  }
  return data;
}

/** Lista conversaciones del usuario logueado */
export async function listConversations() {
  const data = await authedFetch(`/api/conversations`, { method: "GET" });
  // backend responde { ok, data: [...] }
  return data?.data || [];
}

/** Abre (o crea) una conversación 1:1 con otro usuario */
export async function openConversation(participantId) {
  if (!participantId) throw new Error("participantId requerido");
  const data = await authedFetch(`/api/conversations`, {
    method: "POST",
    body: JSON.stringify({ participantId }),
  });
  // backend responde { ok, data: {...} }
  return data?.data || null;
}

const conversationsService = {
  list: listConversations,
  open: openConversation,
};

export default conversationsService;
