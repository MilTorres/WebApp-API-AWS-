
    let inputTimeout;
    const DEBOUNCE_DELAY = 500; // Tiempo de debounce en milisegundos

    async function checkRFID(rfid) {
    console.log("Check RFID: ", rfid); // Mensaje de depuración

    if (!rfid) {
    console.error("El valor del RFID es vacío");
    return; // Salir si el RFID está vacío
}

    const numericValue = parseInt(rfid, 10);
    const hexValue = numericValue.toString(16).toUpperCase().padStart(8, '0'); // Asegura que sea de 8 caracteres
    const hexs = hexValue.substring(6, 8) + hexValue.substring(4, 6) + hexValue.substring(2, 4) + hexValue.substring(0, 2);

    console.log("valor tarjeta ---> " + hexs); // Verifica el valor hexadecimal

    // Si se detecta un RFID completo, enviar la solicitud al servidor
    if (hexs.length > 0) {
    try {
    //const url = `http://192.168.1.65:5000/check_saldo/${hexs}`;
        const url = `https://rom.tinttodry.com/check_saldo/${hexs}`;


    console.log("Haciendo fetch a: ", url); // Mensaje de depuración

    const request = await fetch(url, {
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
});

    if (!request.ok) {
    throw new Error('Usuario no encontrado');
}

    const data = await request.json(); // Espera la respuesta en formato JSON
    console.log("Datos recibidos:", data); // Mensaje de depuración

    const mensajeb = document.getElementById('mensajeb');
    const mensaje = document.getElementById('mensaje');
    const inputField = document.getElementById('rfidInput');

    // Si el usuario existe, muestra el saldo
    if (data.existe) {
    mensajeb.textContent = `Hola ${data.nombre}`;
    mensaje.textContent = `Tu Saldo disponible es: $${data.saldo}`;
} else {
    mensaje.textContent = "Usuario no encontrado.";
}

    mensaje.style.display = 'block'; // Mostrar el mensaje
    mensajeb.style.display = 'block'; // Mostrar el mensaje

    // Limpia el campo de texto
    inputField.value = '';

    // Espera 10 segundos antes de ocultar el mensaje y volver al estado inicial
    setTimeout(() => {
    mensaje.style.display = 'none';
    mensajeb.style.display = 'none'; // Ocultar el mensaje
    inputField.focus(); // Coloca el cursor nuevamente en el input
}, 10000); // 10 segundos

} catch (error) {
    const mensaje = document.getElementById('mensaje');
    const mensajeb = document.getElementById('mensajeb');
    console.error("Error en la solicitud:", error); // Mensaje de depuración
    mensaje.textContent = "Usuario no encontrado.";
    mensaje.style.display = 'block';

    // Limpia el campo de texto
    document.getElementById('rfidInput').value = '';

    // Espera 4 segundos antes de ocultar el mensaje y volver al estado inicial
    setTimeout(() => {
    mensaje.style.display = 'none';
    mensajeb.style.display = 'none'; // Ocultar el mensaje
    document.getElementById('rfidInput').focus(); // Coloca el cursor nuevamente en el input
}, 4000); // 4 segundos
}
}
}

    function debounce(func, delay) {
    return function(...args) {
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(() => {
    func.apply(this, args);
}, delay);
};
}

    // Escuchar los eventos del teclado en el campo RFID
    document.addEventListener('DOMContentLoaded', () => {
    const rfidInput = document.getElementById('rfidInput');
    rfidInput.addEventListener('input', debounce(event => {
    const rfid = event.target.value;
    checkRFID(rfid); // Llama a la función de verificación
}, DEBOUNCE_DELAY));
    rfidInput.focus(); // Coloca el cursor en el campo al cargar la página
});
