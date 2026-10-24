//importamos el modulo express para poder crear el servidor
const express = require('express');

// Creamos l applicacion (el servidor) ejecutando express
const app = express();

//se crean las rutas para el servidor
//ruta por defecto, a manera de prueba
app.get('/', (req, res) => {
    res.send('prueba 1 respuesta del servidor');
});

// Configuramos el puerto por donde el servidor escuchara las peticiones
app.listen(10000);

