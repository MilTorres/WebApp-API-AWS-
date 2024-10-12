let interval;  // Variable para almacenar el intervalo globalmente

// Función para obtener el estado de la lavadora desde el endpoint
async function obtenerEstadoLavadora() {
    try {
        const response = await fetch('https://rom.tinttodry.com/estado/1');

        if (!response.ok) {
            throw new Error('Error al obtener el estado de la lavadora');
        }

        const estado = await response.text(); // Obtener el estado como texto

        console.log('Estado de la lavadora:', estado);

        // Verificar el estado y actualizar la interfaz
        if (estado === 'activo') {
            iniciarCuentaRegresiva();
            document.getElementById('miCheckbox1').checked = true;  // Cambiar el checkbox a activo
            document.getElementById('miCheckbox1').style.backgroundColor = 'green'; // Cambiar el color del checkbox a verde
        } else if (estado === 'desactivado') {
            console.log("Lavadora desactivada");
            // No hacer nada si está desactivado
        } else {
            console.log("Estado desconocido");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para iniciar la cuenta regresiva de 35 minutos
function iniciarCuentaRegresiva() {
    let tiempo = localStorage.getItem('tiempoRestante'); // Intentar obtener el tiempo almacenado

    if (!tiempo) {
        tiempo = 2130; // 35 minutos en segundos (35 * 60)
    } else {
        tiempo = parseInt(tiempo); // Convertir el tiempo almacenado en un número
    }

    const countdownElement = document.getElementById('countdown1');

    // Detener cualquier intervalo existente antes de iniciar uno nuevo
    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const minutos = Math.floor(tiempo / 60);
        const segundos = tiempo % 60;
        countdownElement.textContent = `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

        if (tiempo <= 0) {
            clearInterval(interval);  // Detener el intervalo cuando llegue a 0
            countdownElement.textContent = '35:30';  // Mostrar 00:00 al finalizar
            document.getElementById('miCheckbox1').checked = false;

            actualizarLavadora();
            localStorage.removeItem('tiempoRestante'); // Eliminar el tiempo restante ya que ha terminado
        } else {
            tiempo--;
            localStorage.setItem('tiempoRestante', tiempo); // Guardar el tiempo restante
        }
    }, 1000); // Actualizar cada segundo
}

// Agregar un listener al checkbox para reiniciar la cuenta regresiva si se desactiva
document.getElementById('miCheckbox1').addEventListener('change', function () {
    if (!this.checked) { // Si el usuario desactiva el checkbox
        console.log("Checkbox desactivado por el usuario. Reiniciando cuenta regresiva...");
        clearInterval(interval);  // Detener el intervalo actual
        localStorage.removeItem('tiempoRestante');  // Eliminar el tiempo restante almacenado

        //iniciarCuentaRegresiva(); // Reiniciar la cuenta regresiva
        actualizarLavadora();
        location.reload();
// Llamar a la función para actualizar la lavadora
    }
});

// Función para actualizar el estado de la lavadora
function actualizarLavadora() {
    const url = `https://rom.tinttodry.com/actualizarlav/1`;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            estado: 'completado'  // O el dato que quieras enviar
        })
    })
        .then(response => {
            if (response.ok) {
                console.log('Lavadora actualizada exitosamente.');
            } else {
                console.error('Error al actualizar lavadora.');
            }
        })
        .catch(error => console.error('Error de conexión:', error));
}

// Ejecutar la función para obtener el estado al cargar la página
window.onload = obtenerEstadoLavadora;
