const fechaBoda = new Date("2026-08-22T17:45:00-05:00").getTime();

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

const bienvenida = document.getElementById("bienvenida");
const musica = document.getElementById("musica-boda");
const entrarConMusica = document.getElementById("entrar-con-musica");
const entrarSinMusica = document.getElementById("entrar-sin-musica");
const controlMusica = document.getElementById("control-musica");
const textoControlMusica = controlMusica.querySelector(".control-musica-texto");

document.body.classList.add("bienvenida-abierta");
musica.volume = 0.35;

function actualizarControlMusica() {
    const reproduciendo = !musica.paused;
    controlMusica.classList.toggle("reproduciendo", reproduciendo);
    controlMusica.setAttribute("aria-pressed", String(reproduciendo));
    controlMusica.setAttribute("aria-label", reproduciendo ? "Pausar música" : "Reproducir música");
    textoControlMusica.textContent = reproduciendo ? "Pausar" : "Música";
}

function cerrarBienvenida() {
    bienvenida.classList.add("cerrando");
    document.body.classList.remove("bienvenida-abierta");
    controlMusica.hidden = false;
    window.setTimeout(() => bienvenida.remove(), 750);
}

entrarConMusica.addEventListener("click", async () => {
    cerrarBienvenida();
    try {
        await musica.play();
    } catch (error) {
        console.info("El navegador no permitió iniciar el audio.", error);
    }
    actualizarControlMusica();
});

entrarSinMusica.addEventListener("click", () => {
    cerrarBienvenida();
    actualizarControlMusica();
});

controlMusica.addEventListener("click", async () => {
    if (musica.paused) {
        try {
            await musica.play();
        } catch (error) {
            console.info("No fue posible reproducir el audio.", error);
        }
    } else {
        musica.pause();
    }
    actualizarControlMusica();
});

musica.addEventListener("play", actualizarControlMusica);
musica.addEventListener("pause", actualizarControlMusica);
