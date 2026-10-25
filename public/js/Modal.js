// Clase que representa un modal (elemento <dialog>) de la página
class Modal {
    // ATRIBUTOS PRIVADOS: los elementos HTML que esta clase controla
    #dialogo;
    #formulario;
    #mensaje;

    // El constructor recibe el id del <dialog> y busca sus elementos internos
    constructor(idDialogo) {
        this.#dialogo = document.getElementById(idDialogo);
        this.#formulario = this.#dialogo.querySelector('form');
        this.#mensaje = this.#dialogo.querySelector('.mensaje');

        // Evitamos que la tecla Escape cierre el modal: solo se cierra desde el código
        this.#dialogo.addEventListener('cancel', (evento) => {
            evento.preventDefault();
        });
    }

    // MÉTODO PÚBLICO: abre el modal (si ya está abierto, no hace nada)
    abrir() {
        if (!this.#dialogo.open) {
            this.#dialogo.showModal();
        }
    }

    // MÉTODO PÚBLICO: cierra el modal
    cerrar() {
        this.#dialogo.close();
    }

    // MÉTODO PÚBLICO: muestra un mensaje en verde (exito = true) o en rojo (exito = false)
    mostrarMensaje(texto, exito) {
        this.#mensaje.textContent = texto;
        this.#mensaje.classList.remove('exito', 'error');
        this.#mensaje.classList.add(exito ? 'exito' : 'error');
    }

    // MÉTODO PÚBLICO: borra los campos y el mensaje
    limpiar() {
        this.#formulario.reset();
        this.#mensaje.textContent = '';
        this.#mensaje.classList.remove('exito', 'error');
    }

    // MÉTODO PÚBLICO: devuelve lo que el usuario escribió, como { usuario, contrasena }
    obtenerDatos() {
        return Object.fromEntries(new FormData(this.#formulario));
    }

    // MÉTODO PÚBLICO: registra la función que se ejecutará al enviar el formulario
    alEnviar(funcion) {
        this.#formulario.addEventListener('submit', (evento) => {
            // Evita que el navegador recargue la página al enviar el formulario
            evento.preventDefault();
            funcion();
        });
    }
}