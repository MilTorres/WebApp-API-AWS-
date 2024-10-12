document.getElementById('backupBtn').addEventListener('click', async function() {
    try {
        const response = await fetch('/backup', {
            method: 'GET'
        });

        if (response.ok) {
            alert('La copia de seguridad se ha realizado con éxito.');
        } else {
            alert('Hubo un problema al realizar la copia de seguridad.');
        }
    } catch (error) {
        console.error('Error durante la copia de seguridad:', error);
        alert('Error en la red. Inténtalo de nuevo más tarde.');
    }
});
