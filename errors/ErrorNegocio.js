// Error propio de la aplicación: hereda de Error y agrega un código HTTP
class ErrorNegocio extends Error {
    // El constructor recibe el mensaje para el cliente y el código HTTP
    constructor(mensaje, codigoHttp) {
        // super() llama al constructor de la clase padre (Error)
        super(mensaje);
        this.name = 'ErrorNegocio';
        this.codigoHttp = codigoHttp;
    }
}

// Exportamos la clase para usarla en otros archivos
module.exports = ErrorNegocio;