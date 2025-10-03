import ENVIRONMENT from "../config/environment";

const HTTP_METHODS = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

const HEADERS = {
    CONTENT_TYPE: 'Content-Type',
};

const CONTENT_TYPE_VALUES = {
    JSON: 'application/json',
};

export async function register(name, email, password) {
    const usuario = {
        email,
        username: name,
        password
    };

    const response_http = await fetch(
       `${ENVIRONMENT.URL_API}/api/auth/register`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(usuario)
        }
    );

    const response_data = await response_http.json();

    if (!response_http.ok) {
        throw new Error(response_data.message);
    }

    return response_data;
}

export async function login(email, password) {
    const response = await fetch(
        `${ENVIRONMENT.URL_API}/api/auth/login`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify({ email, password })
        }
    );

    const response_data = await response.json();

    if (!response.ok) {
        throw new Error(response_data.message);
    }

    return response_data;
}

