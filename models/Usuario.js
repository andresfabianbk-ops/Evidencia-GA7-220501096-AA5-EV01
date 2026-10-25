// Importamos mongoose para poder definir el esquema del usuario
const mongoose = require('mongoose');

// Esquema: define los campos que tendrá cada usuario y sus reglas
const usuarioschema = mongoose.Schema({
     // Nombre de usuario: texto, obligatorio y único (no se puede repetir)
     usuario: {
        type: String,
        required: true,
        unique: true
     },
    // Contraseña: texto, obligatorio
    contrasena: {
        type: String,
        required: true
    },
    //Fecha de registro: se llama sola con la fecha actual
    fecha: {
        type: Date,
        default: Date.now
    }
});

// Exportamos el modelo de usuario para poder usarlo en otros archivos
module.exports = mongoose.model('Usuario', usuarioschema);
