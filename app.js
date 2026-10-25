// Cargamos las variables privadas del archivo .env en process.env
process.loadEnvFile();

// Importamos la clase Servidor
const Servidor = require('./Servidor');

// Creamos un objeto Servidor que escuchará en el puerto 10000
const servidor = new Servidor(10000);

// Iniciamos el servidor
servidor.iniciar();