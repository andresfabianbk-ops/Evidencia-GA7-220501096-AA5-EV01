// Importamos nuestro error propio para poder reconocerlo al capturarlo
const ErrorNegocio = require('../errors/ErrorNegocio');

// Clase que recibe las peticiones HTTP y responde usando el servicio
class UsuarioControlador {
    // ATRIBUTO PRIVADO: el servicio que contiene la lógica
    #servicio;

    // El constructor recibe el servicio desde afuera (inyección de dependencias)
    constructor(servicio) {
        this.#servicio = servicio;
    }

    // MÉTODO PRIVADO: convierte un error en una respuesta HTTP
    #responderError(res, error) {
        // Si es un error de negocio, usamos su código HTTP y su mensaje
        if (error instanceof ErrorNegocio) {
            return res.status(error.codigoHttp).json({ mensaje: error.message });
        }
        // Cualquier otro error es inesperado: respondemos 500
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }

    // MÉTODO PÚBLICO: atiende POST /usuarios/registro
    registrar = async (req, res) => {
        try {
            // Sacamos usuario y contraseña del cuerpo (si no hay cuerpo, usamos un objeto vacío)
            const { usuario, contrasena } = req.body ?? {};
            await this.#servicio.registrar(usuario, contrasena);
            res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
        } catch (error) {
            this.#responderError(res, error);
        }
    };

    // MÉTODO PÚBLICO: atiende POST /usuarios/login
    iniciarSesion = async (req, res) => {
        try {
            const { usuario, contrasena } = req.body ?? {};
            await this.#servicio.autenticar(usuario, contrasena);
            res.status(200).json({ mensaje: 'Autenticación satisfactoria' });
        } catch (error) {
            this.#responderError(res, error);
        }
    };
}

// Exportamos la clase para usarla en otros archivos
module.exports = UsuarioControlador;