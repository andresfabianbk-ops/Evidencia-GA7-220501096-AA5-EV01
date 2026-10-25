// Cargamos las variables privadas del archivo .env en process.env
process.loadEnvFile();

// Importamos el módulo express para poder crear el servidor
const express = require('express');

// Importamos mongoose para conectarnos a la base de datos MongoDB
const mongoose = require('mongoose');

// Creamos la aplicación (el servidor) ejecutando express
const app = express();

// SE CREAN LAS RUTAS
// Ruta por defecto, a manera de prueba
app.get('/', (req, res) => {
    res.send('prueba 1 respuesta del servidor');
});

// Conexión a la BD: la dirección se toma del archivo .env
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Se ejecuta si la conexión fue exitosa
        console.log('Si hay conexión a la BD');
    })
    .catch((error) => {
        // Se ejecuta si la conexión falló, para ver el motivo sin que el programa se caiga
        console.log('Error de conexión a la BD:', error.message);
    });

// Configuramos el puerto por donde el servidor va a escuchar las peticiones
app.listen(10000);
