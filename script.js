const fechaBoda = new Date("August 22, 2026 18:00:00").getTime();

function actualizarContador() {

    const ahora = new Date().getTime();

    const diferencia = fechaBoda - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (diferencia % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const segundos = Math.floor(
        (diferencia % (1000 * 60))
        / 1000
    );

    document.getElementById("contador").innerHTML =
        dias + " días " +
        horas + " horas " +
        minutos + " minutos " +
        segundos + " segundos";
}

setInterval(actualizarContador, 1000);

actualizarContador();