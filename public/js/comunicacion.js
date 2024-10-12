async function enviarRfId() {
    const rfidInput = document.getElementById('rfid');
    const resultado = document.getElementById('resultado');
    const rfid = rfidInput.value;

    try {
        const response = await fetch(`/check_uid/${rfid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const result = await response.json();

        if (result) {
            resultado.textContent = 'RFID encontrado.';
        } else {
            resultado.textContent = 'RFID no encontrado.';
        }
    } catch (error) {
        console.error('Error:', error);
        resultado.textContent = 'Hubo un error al procesar la solicitud.';
    }
}
