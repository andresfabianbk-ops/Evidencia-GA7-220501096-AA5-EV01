// Importamos crypto (incluido en Node.js) para proteger las contraseñas
const crypto = require('crypto');

// Importamos el modelo Usuario para guardar y buscar en la BD
const Usuario = require('../models/Usuario');

// Importamos nuestro error propio, que lleva un código HTTP
const ErrorNegocio = require('../errors/ErrorNegocio');

// Clase que contiene la lógica de registro y autenticación de usuarios
class UsuarioServicio {
    // MÉTODO PRIVADO: convierte la contraseña en "sal:hash" (nunca se guarda en texto plano)
    #protegerContrasena(contrasena) {
        const sal = crypto.randomBytes(16).toString('hex');
        const hash = crypto.scryptSync(contrasena, sal, 64).toString('hex');
        return sal + ':' + hash;
    }

    // MÉTODO PRIVADO: compara una contraseña recibida con la que está guardada
    #verificarContrasena(contrasena, contrasenaGuardada) {
        // Separamos la sal y el hash que se guardaron al registrar
        const [sal, hashGuardado] = contrasenaGuardada.split(':');
        // Repetimos el cálculo con la misma sal
        const hashIntento = crypto.scryptSync(contrasena, sal, 64);
        // Comparación segura: tarda siempre lo mismo
        return crypto.timingSafeEqual(Buffer.from(hashGuardado, 'hex'), hashIntento);
    }

    // MÉTODO PRIVADO: comprueba que usuario y contraseña sean texto y no estén vacíos
    #sonDatosValidos(usuario, contrasena) {
        return typeof usuario === 'string' && typeof contrasena === 'string' && usuario !== '' && contrasena !== '';
    }

    // MÉTODO PÚBLICO: registra un usuario nuevo
    async registrar(usuario, contrasena) {
        if (!this.#sonDatosValidos(usuario, contrasena)) {
            throw new ErrorNegocio('Debe enviar usuario y contraseña', 400);
        }

        // Buscamos si ya existe un usuario con ese nombre
        const existe = await Usuario.findOne({ usuario: usuario });
        if (existe) {
            throw new ErrorNegocio('El usuario ya existe', 409);
        }

        // Creamos el usuario guardando la contraseña protegida
        const nuevoUsuario = new Usuario({
            usuario: usuario,
            contrasena: this.#protegerContrasena(contrasena)
        });
        await nuevoUsuario.save();
    }

    // MÉTODO PÚBLICO: verifica las credenciales de un usuario
    async autenticar(usuario, contrasena) {
        if (!this.#sonDatosValidos(usuario, contrasena)) {
            throw new ErrorNegocio('Error en la autenticación', 401);
        }

        // Buscamos el usuario; si no existe o la contraseña no coincide, es el mismo error
        const usuarioEncontrado = await Usuario.findOne({ usuario: usuario });
        if (!usuarioEncontrado || !this.#verificarContrasena(contrasena, usuarioEncontrado.contrasena)) {
            throw new ErrorNegocio('Error en la autenticación', 401);
        }
    }
}

// Exportamos la clase para usarla en otros archivos
module.exports = UsuarioServicio;