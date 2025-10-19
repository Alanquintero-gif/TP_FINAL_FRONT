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

/** Lista mensajes de una conversación */
export async function listMessages(conversationId) {
  if (!conversationId) throw new Error("conversationId requerido");
  const data = await authedFetch(`/api/messages/${conversationId}`, {
    method: "GET",
  });
  // backend responde { ok, data: [...] }
  return data?.data || [];
}

/** Envía un mensaje en una conversación */
export async function sendMessage(conversationId, text) {
  if (!conversationId) throw new Error("conversationId requerido");
  if (!text?.trim()) throw new Error("Texto vacío");

  const data = await authedFetch(`/api/messages/${conversationId}`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  // backend responde { ok, data: {...} }
  return data?.data || null;
}

/** Elimina (soft delete) un mensaje por id */
export async function deleteMessage(messageId) {
  if (!messageId) throw new Error("messageId requerido");
  await authedFetch(`/api/messages/${messageId}`, { method: "DELETE" });
  return true;
}

const messagesService = {
  list: listMessages,
  send: sendMessage,
  remove: deleteMessage,
};

export default messagesService;
