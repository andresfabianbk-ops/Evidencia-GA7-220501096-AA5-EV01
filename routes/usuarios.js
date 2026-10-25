// Importamos express para poder crear el enrutador
const express = require('express');

// Importamos crypto (viene incluido en Node.js) para proteger las contraseñas
const crypto = require('crypto');

// Importamos el modelo Usuario para guardar y buscar usuarios en la BD
const Usuario = require('../models/Usuario');

// Creamos el enrutador: una "miniaplicación" que agrupa las rutas de usuarios
const router = express.Router();

// RUTA DE REGISTRO: POST /usuarios/registro
router.post('/registro', async (req, res) => {
    try {
        // Sacamos usuario y contraseña del cuerpo de la petición
        const { usuario, contrasena } = req.body;

        // Validamos que ambos datos lleguen y sean texto
        if (typeof usuario !== 'string' || typeof contrasena !== 'string' || !usuario || !contrasena) {
            return res.status(400).json({ mensaje: 'Debe enviar usuario y contraseña' });
        }

        // Buscamos si ya existe un usuario con ese nombre
        const existe = await Usuario.findOne({ usuario: usuario });
        if (existe) {
            return res.status(409).json({ mensaje: 'El usuario ya existe' });
        }

        // Protegemos la contraseña: sal aleatoria + hash (scrypt)
        const sal = crypto.randomBytes(16).toString('hex');
        const hash = crypto.scryptSync(contrasena, sal, 64).toString('hex');

        // Creamos el usuario guardando la sal y el hash, nunca la contraseña real
        const nuevoUsuario = new Usuario({ usuario: usuario, contrasena: sal + ':' + hash });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el registro', error: error.message });
    }
});

// Exportamos el enrutador para usarlo en app.js
module.exports = router;

