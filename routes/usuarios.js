// Importamos express para poder crear el enrutador
const express = require('express');

// Clase que define las rutas de usuarios y las asocia al controlador
class RutasUsuario {
    // ATRIBUTOS PRIVADOS: el enrutador de Express y el controlador que atiende las rutas
    #router;
    #controlador;

    // El constructor recibe el controlador desde afuera (inyección de dependencias)
    constructor(controlador) {
        this.#controlador = controlador;
        this.#router = express.Router();
        this.#configurarRutas();
    }

    // MÉTODO PRIVADO: asocia cada dirección con un método del controlador
    #configurarRutas() {
        this.#router.post('/registro', this.#controlador.registrar);
        this.#router.post('/login', this.#controlador.iniciarSesion);
    }

    // MÉTODO PÚBLICO: entrega el enrutador para conectarlo a la aplicación
    obtenerRouter() {
        return this.#router;
    }
}

// Exportamos la clase para usarla en otros archivos
module.exports = RutasUsuario;