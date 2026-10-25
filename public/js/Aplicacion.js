// Clase principal de la interfaz: conecta la API con los modales
class Aplicacion {
    // ATRIBUTOS PRIVADOS: la API y los dos modales
    #api;
    #modalLogin;
    #modalRegistro;

    // El constructor crea los objetos que necesita y configura los eventos
    constructor() {
        this.#api = new ApiUsuarios();
        this.#modalLogin = new Modal('modalLogin');
        this.#modalRegistro = new Modal('modalRegistro');
        this.#configurarEventos();
    }

    // MÉTODO PRIVADO: conecta formularios y enlaces con sus acciones
    #configurarEventos() {
        // Al enviar cada formulario se ejecuta su método correspondiente
        this.#modalLogin.alEnviar(() => this.#iniciarSesion());
        this.#modalRegistro.alEnviar(() => this.#registrar());

        // Enlace "Regístrate": pasa del modal de login al de registro
        document.getElementById('enlaceRegistro').addEventListener('click', (evento) => {
            evento.preventDefault();
            this.#cambiarModal(this.#modalLogin, this.#modalRegistro);
        });

        // Enlace "Inicia sesión": vuelve del modal de registro al de login
        document.getElementById('enlaceLogin').addEventListener('click', (evento) => {
            evento.preventDefault();
            this.#cambiarModal(this.#modalRegistro, this.#modalLogin);
        });
    }

    // MÉTODO PRIVADO: cierra un modal y abre el otro, ambos limpios
    #cambiarModal(origen, destino) {
        origen.cerrar();
        origen.limpiar();
        destino.limpiar();
        destino.abrir();
    }

    // MÉTODO PRIVADO: envía las credenciales del login y muestra el resultado
    async #iniciarSesion() {
        const { usuario, contrasena } = this.#modalLogin.obtenerDatos();
        const resultado = await this.#api.iniciarSesion(usuario, contrasena);
        this.#modalLogin.mostrarMensaje(resultado.mensaje, resultado.exito);
    }

    // MÉTODO PRIVADO: envía los datos del registro y muestra el resultado
    async #registrar() {
        const { usuario, contrasena } = this.#modalRegistro.obtenerDatos();
        const resultado = await this.#api.registrar(usuario, contrasena);
        this.#modalRegistro.mostrarMensaje(resultado.mensaje, resultado.exito);

        // Si el registro salió bien, 1.5 segundos después volvemos al login
        if (resultado.exito) {
            setTimeout(() => this.#cambiarModal(this.#modalRegistro, this.#modalLogin), 1500);
        }
    }

    // MÉTODO PÚBLICO: arranca la interfaz mostrando el modal de inicio de sesión
    iniciar() {
        this.#modalLogin.abrir();
    }
}

// Creamos la aplicación y la iniciamos
const aplicacion = new Aplicacion();
aplicacion.iniciar();