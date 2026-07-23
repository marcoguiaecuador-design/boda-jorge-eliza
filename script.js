const fechaBoda = new Date("2026-08-22T15:45:00-05:00").getTime();

function actualizarContador() {
    const ahora = Date.now();
    const diferencia = fechaBoda - ahora;
    const contador = document.getElementById("contador");

    if (diferencia <= 0) {
        contador.textContent = "¡Llegó nuestro gran día!";
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    contador.textContent = `${dias} días ${horas} horas ${minutos} minutos ${segundos} segundos`;
}

window.setInterval(actualizarContador, 1000);
actualizarContador();

const musica = document.getElementById("musica-boda");
const controlMusica = document.getElementById("control-musica");
const textoControlMusica = controlMusica.querySelector(".control-musica-texto");

musica.volume = 0.35;

function actualizarControlMusica() {
    const reproduciendo = !musica.paused && !musica.muted;
    controlMusica.classList.toggle("reproduciendo", reproduciendo);
    controlMusica.setAttribute("aria-pressed", String(reproduciendo));
    controlMusica.setAttribute("aria-label", reproduciendo ? "Silenciar música" : "Activar música");
    textoControlMusica.textContent = reproduciendo ? "Silenciar" : "Música";
}

async function iniciarMusica() {
    try {
        await musica.play();
    } catch (error) {
        // Algunos navegadores esperan la primera interacción del visitante.
    }
    actualizarControlMusica();
}

controlMusica.addEventListener("click", async () => {
    if (musica.paused) {
        musica.muted = false;
        await iniciarMusica();
    } else {
        musica.muted = !musica.muted;
    }
    actualizarControlMusica();
});

document.addEventListener("pointerdown", (evento) => {
    if (musica.paused && !evento.target.closest("#control-musica")) {
        iniciarMusica();
    }
}, { once: true });

musica.addEventListener("play", actualizarControlMusica);
musica.addEventListener("pause", actualizarControlMusica);
musica.addEventListener("volumechange", actualizarControlMusica);

iniciarMusica();
