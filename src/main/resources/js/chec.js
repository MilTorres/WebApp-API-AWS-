// Crear una nueva conexión WebSocket
 const socket = new WebSocket('ws://192.168.1.69:5000/ws'); // Ajusta la URL y el puerto si es necesario


// Manejar la apertura de la conexión
socket.onopen = function(event) {
    console.log('Conexión WebSocket abierta');

};

// Manejar los mensajes recibidos del servidor
socket.onmessage = function(event) {
    console.log('Mensaje recibido del servidor Lavadora Estado:', event.data);
    // Procesar el mensaje y actualizar la UI
    const estadoElemento = document.getElementById('lavadoraEstado');
    const estado = parseInt(event.data);
    // Dependiendo del estado, puedes actualizar el texto o el estilo

    if (estado === 1) {

        estadoElemento.textContent = 'La lavadora está activa';
        estadoElemento.style.color = 'green'; // Cambia el color a verde si está activa
    } else if (estado === 0) {
        estadoElemento.textContent = 'La lavadora está inactiva';
        estadoElemento.style.color = 'red'; // Cambia el color a rojo si está inactiva
    } else {
        estadoElemento.textContent = 'Estado desconocido';
        estadoElemento.style.color = 'gray'; // Color gris para estado desconocido
    }
    console.log('estado:', estado);
    updateUI(estado);

};

// Manejar errores de conexión
socket.onerror = function(error) {
    console.error('Error en WebSocket:', error);
};

// Manejar el cierre de la conexión
socket.onclose = function(event) {
    console.log('Conexión WebSocket cerrada:', event);
};

// Función para actualizar el estado del `check` y la cuenta regresiva
function updateUI(state) {
    const checkbox = document.getElementById('myCheckbox1');

    if (state === 1) {
        checkbox.checked = true;
        startCountdown(); // Iniciar o continuar la cuenta regresiva
    } else {
        checkbox.checked = false;
        resetCountdown();
    }
}

// Función para iniciar o continuar la cuenta regresiva
function startCountdown() {

    const countdownLabel = document.getElementById('countdown1');
    let timer = parseInt(localStorage.getItem('countdownTime')) || 15; // Obtener tiempo restante o 15 segundos si no está definido

    // Mostrar el tiempo restante
    updateCountdownLabel(timer);

    const interval = setInterval(function () {
        timer--;
        updateCountdownLabel(timer);

        // Guardar el tiempo restante en localStorage
        localStorage.setItem('countdownTime', timer);

        if (timer <= 0) {
            clearInterval(interval);
            countdownLabel.textContent = '00:00'; // Finaliza la cuenta regresiva
            // Enviar mensaje al servidor para actualizar el estado si es necesario
            console.log('Envia mensaje al servidor WebSocket:');
            socket.send('estado=0'); // Ejemplo de cómo enviar un mensaje al servidor
            localStorage.removeItem('countdownTime'); // Limpiar tiempo de cuenta regresiva
            localStorage.removeItem('checkboxState'); // Limpiar estado del checkbox
            location.reload(); // Recargar la página
        }
    }, 1000);

    // Guardar la referencia al intervalo para que se pueda limpiar si es necesario
    countdownLabel.dataset.interval = interval;
}

// Función para actualizar la etiqueta del contador
function updateCountdownLabel(seconds) {
    const countdownLabel = document.getElementById('countdown1');
    const displaySeconds = seconds < 10 ? "0" + seconds : seconds;

    countdownLabel.textContent = "00:" + displaySeconds;
}

// Función para reiniciar la cuenta regresiva
function resetCountdown() {
    const countdownLabel = document.getElementById('countdown1');
    countdownLabel.textContent = '00:15'; // Reestablecer a 15 segundos
    localStorage.setItem('countdownTime', 15); // Guardar el tiempo de 15 segundos

    // Limpiar el intervalo de cuenta regresiva si existe
    if (countdownLabel.dataset.interval) {
        clearInterval(countdownLabel.dataset.interval);
        delete countdownLabel.dataset.interval;
    }
}

// Función para inicializar el estado al cargar la página
function initialize() {
    const savedTime = localStorage.getItem('countdownTime');
    const savedState = localStorage.getItem('checkboxState');
    const checkbox = document.getElementById('myCheckbox1');

    if (savedState) {
        checkbox.checked = savedState === 'true';
    }

    if (savedTime && parseInt(savedTime) > 0) {
        startCountdown(); // Continuar la cuenta regresiva
    } else {
        resetCountdown(); // Establecer la cuenta regresiva en 15 segundos
    }
}

// Ejecutar la inicialización al cargar la página
window.onload = initialize;
