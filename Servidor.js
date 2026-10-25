// Importamos los módulos que necesita el servidor
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Importamos nuestras clases
const UsuarioServicio = require('./services/UsuarioServicio');
const UsuarioControlador = require('./controllers/UsuarioControlador');
const RutasUsuario = require('./routes/usuarios');

// Clase que arma y arranca la aplicación
class Servidor {
    // ATRIBUTOS PRIVADOS: la aplicación de Express y el puerto donde escucha
    #app;
    #puerto;

    // El constructor crea la aplicación y la deja configurada
    constructor(puerto) {
        this.#app = express();
        this.#puerto = puerto;
        this.#configurarMiddlewares();
        this.#configurarRutas();
    }

    // MÉTODO PRIVADO: middlewares que se ejecutan antes de las rutas
    #configurarMiddlewares() {
        // Convierte el cuerpo de las peticiones POST a JSON
        this.#app.use(bodyParser.json());
    }

    // MÉTODO PRIVADO: crea los objetos, los conecta entre sí y registra las rutas
    #configurarRutas() {
        const servicio = new UsuarioServicio();
        const controlador = new UsuarioControlador(servicio);
        const rutasUsuario = new RutasUsuario(controlador);

        // Todas las rutas de usuarios empiezan con /usuarios
        this.#app.use('/usuarios', rutasUsuario.obtenerRouter());

        // Ruta por defecto, a manera de prueba
        this.#app.get('/', (req, res) => {
            res.send('prueba 1 respuesta del servidor');
        });
    }

    // MÉTODO PRIVADO: conecta con MongoDB usando la dirección del archivo .env
    async #conectarBaseDatos() {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('Si hay conexión a la BD');
        } catch (error) {
            console.log('Error de conexión a la BD:', error.message);
        }
    }

    // MÉTODO PÚBLICO: conecta la base de datos y pone el servidor a escuchar
    iniciar() {
        this.#conectarBaseDatos();
        this.#app.listen(this.#puerto, () => {
            console.log('Servidor escuchando en el puerto ' + this.#puerto);
        });
    }
}

// Exportamos la clase para usarla en otros archivos
module.exports = Servidor;