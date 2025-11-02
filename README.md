Este proyecto corresponde al frontend del trabajo integrador final Full Stack, desarrollado en React con Vite.
La aplicación simula una plataforma de mensajería inspirada en WhatsApp Web, con funcionalidades completas de autenticación, verificación de email, recuperación de contraseña, envío de mensajes y gestión de conversaciones.

El frontend se comunica de forma directa con un backend desarrollado en Express + MongoDB, y ambos proyectos fueron desplegados públicamente.

Utilicé:
1- React (con Vite)
2- React Router DOM
3- Context API para manejo global de estados
4- Fetch API para conexión con el backend
5- CSS modular y responsivo
6- React Icons

Las funcionalidades que implementé son:
1- Registro de usuarios con verificación por correo electrónico.
2- Inicio de sesión con autenticación JWT.
3- Recuperación de contraseña mediante correo electrónico con token temporal.
4- Visualización y envío de mensajes persistentes en MongoDB.
5- Cierre de sesión con limpieza del token y redirección al login.
6- Interfaz tipo WhatsApp con contactos predefinidos y conversaciones sincronizadas con el backend.
Los mensajes enviados se guardan en la base de datos y se recuperan automáticamente al volver a iniciar sesión, manteniendo la persistencia entre sesiones.

El frontend consume una API REST a través de tres servicios principales:

1- authService.js: gestiona el registro, login, verificación, recuperación y cierre de sesión.
2- conversationsService.js: obtiene o crea conversaciones.
3- messagesService.js: lista, envía y elimina mensajes.
Cada servicio incluye manejo del token JWT almacenado localmente para proteger las peticiones.


La interfaz replica el diseño de WhatsApp Web, con una columna izquierda para contactos y una derecha para las conversaciones.
Cuenta con un tema oscuro uniforme, diseño responsivo desde 2000 px hasta 320 px, y mantiene coherencia visual en todas las pantallas (login, registro, recuperación, chat).

En conclusión, la aplicación implementa un flujo completo de autenticación, registro y mensajería.
El usuario puede registrarse, verificar su cuenta por correo, iniciar sesión, chatear con contactos predefinidos, borrar mensajes y cerrar sesión de forma segura.

El sistema funciona de manera completamente integrada con el backend, cumpliendo los requerimientos de seguridad, arquitectura y persistencia de datos exigidos por la consigna.
