# Servicio web de registro e inicio de sesión

Evidencia GA7-220501096-AA5-EV01: Diseño y desarrollo de servicios web - caso.

Servicio web hecho con Node.js, Express y MongoDB (Mongoose), con programación orientada a objetos.
Permite registrar un usuario e iniciar sesión. Las contraseñas se guardan protegidas (sal + hash), nunca en texto plano.

## Requisitos

- Node.js 24 o superior
- Una base de datos en MongoDB Atlas

## Instalación

1. Instalar las dependencias:

```
npm install
```

2. Crear un archivo `.env` en la raíz del proyecto, copiando `.env.example`, y poner la dirección de conexión propia:

```
MONGO_URI=mongodb+srv://TU_USUARIO:TU_CONTRASENA@TU_HOST.mongodb.net/miBD?retryWrites=true&w=majority
```

3. Iniciar el servidor:

```
npm start
```

4. Abrir en el navegador: http://localhost:10000

## Rutas de la API

| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| POST | `/usuarios/registro` | Registra un usuario nuevo | 201, 400, 409 |
| POST | `/usuarios/login` | Inicia sesión | 200 "Autenticación satisfactoria", 401 "Error en la autenticación" |

Cuerpo de las peticiones (JSON):

```json
{
    "usuario": "andres",
    "contrasena": "Prueba123"
}
```

## Estructura del proyecto

| Archivo o carpeta | Clase | Responsabilidad |
|---|---|---|
| `app.js` | | Punto de entrada: crea e inicia el servidor |
| `Servidor.js` | `Servidor` | Arma la aplicación y conecta la base de datos |
| `routes/usuarios.js` | `RutasUsuario` | Asocia cada ruta con el controlador |
| `controllers/UsuarioControlador.js` | `UsuarioControlador` | Recibe la petición y responde |
| `services/UsuarioServicio.js` | `UsuarioServicio` | Lógica de registro y autenticación |
| `models/Usuario.js` | `Usuario` | Esquema del usuario en MongoDB |
| `errors/ErrorNegocio.js` | `ErrorNegocio` | Error propio con código HTTP |
| `public/` | `ApiUsuarios`, `Modal`, `Aplicacion` | Interfaz: fondo de un color, modal de login y enlace de registro |