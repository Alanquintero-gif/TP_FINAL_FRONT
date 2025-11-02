import ENVIRONMENT from "../config/environment";

const HTTP_METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
};

const HEADERS = {
  CONTENT_TYPE: "Content-Type",
};

const CONTENT_TYPE_VALUES = {
  JSON: "application/json",
};

// ===== Helpers de token (clave real que estás usando) =====
const TOKEN_KEY = "auth_token";

export function getToken() {
  return (
    localStorage.getItem(TOKEN_KEY) ||
    sessionStorage.getItem(TOKEN_KEY) ||
    null
  );
}

export function setToken(token, persist = true) {
  // persist=true => localStorage; false => sessionStorage
  clearToken();
  if (persist) localStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export async function logout() {
  clearToken();
  return true;
}

// ===== Endpoints de auth =====
export async function register(name, email, password) {
  const usuario = { email, username: name, password };

  const response_http = await fetch(`${ENVIRONMENT.URL_API}/api/auth/register`, {
    method: HTTP_METHODS.POST,
    headers: { [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON },
    body: JSON.stringify(usuario),
  });

  const response_data = await response_http.json();
  if (!response_http.ok) {
    throw new Error(response_data?.message || "Error en el registro");
  }
  return response_data;
}

export async function login(email, password, { persist = true } = {}) {
  const response = await fetch(`${ENVIRONMENT.URL_API}/api/auth/login`, {
    method: HTTP_METHODS.POST,
    headers: { [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON },
    body: JSON.stringify({ email, password }),
  });

  const response_data = await response.json();
  if (!response.ok) {
    throw new Error(response_data?.message || "Credenciales inválidas");
  }

  // Si tu backend devuelve { token, user, ... } guardamos el token
  const token = response_data?.token || response_data?.authorization_token;
  if (token) setToken(token, persist);

  return response_data;
}

export default {
  // helpers
  getToken,
  setToken,
  clearToken,
  logout,
  // endpoints
  register,
  login,
};
