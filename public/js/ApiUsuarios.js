// Clase que se comunica con la API de usuarios del servidor
class ApiUsuarios {
    // ATRIBUTO PRIVADO: la dirección base de la API
    #urlBase;

    // El constructor recibe la dirección base; si no se envía, usa '/usuarios'
    constructor(urlBase = '/usuarios') {
        this.#urlBase = urlBase;
    }

    // MÉTODO PRIVADO: envía usuario y contraseña a una ruta y devuelve el resultado
    async #enviar(ruta, usuario, contrasena) {
        try {
            const respuesta = await fetch(this.#urlBase + ruta, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario: usuario, contrasena: contrasena })
            });
            // Leemos el JSON que responde el servidor
            const datos = await respuesta.json();
            // respuesta.ok es true cuando el código HTTP es 200 a 299
            return { exito: respuesta.ok, mensaje: datos.mensaje };
        } catch (error) {
            // Se ejecuta si el servidor no responde o la respuesta no es JSON
            return { exito: false, mensaje: 'No se pudo conectar con el servidor' };
        }
    }

    // MÉTODO PÚBLICO: registra un usuario nuevo
    registrar(usuario, contrasena) {
        return this.#enviar('/registro', usuario, contrasena);
    }

    // MÉTODO PÚBLICO: inicia sesión con un usuario existente
    iniciarSesion(usuario, contrasena) {
        return this.#enviar('/login', usuario, contrasena);
    }
}