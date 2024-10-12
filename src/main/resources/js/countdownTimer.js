console.log("Conecta con clase CountdownTimer.js")


document.addEventListener("DOMContentLoaded", function() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var countdowns = [
        { display: document.getElementById("countdown1"), countdown: 15 * 60, timer: null },
        { display: document.getElementById("countdown2"), countdown: 15 * 60, timer: null },
        { display: document.getElementById("countdown3"), countdown: 15 * 60, timer: null },
        { display: document.getElementById("countdown4"), countdown: 15 * 60, timer: null },
        { display: document.getElementById("countdown5"), countdown: 15 * 60, timer: null },
        { display: document.getElementById("countdown6"), countdown: 15 * 60, timer: null },
        { display: document.getElementById("countdown7"), countdown: 15 * 60, timer: null },
        { display: document.getElementById("countdown8"), countdown: 15 * 60, timer: null },
        { display: document.getElementById("countdown9"), countdown: 1 * 5, timer: null }
    ];

    checkboxes.forEach(function(checkbox, index) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                startCountdown(index);
            } else {
                clearInterval(countdowns[index].timer);
                countdowns[index].countdown = 15 * 60; // Reiniciar el contador a 15 minutos (15 * 60 segundos)
                updateCountdownDisplay(index);
                countdowns[index].display.classList.add("texto-reinicio"); // Agregar clase para color verde
                setTimeout(function() {
                    countdowns[index].display.classList.remove("texto-reinicio"); // Quitar clase después de 2 segundos
                }, 60000);
            }
        });
    });

    function startCountdown(index) {
        clearInterval(countdowns[index].timer);
        countdowns[index].timer = setInterval(function() {
            countdowns[index].countdown--;

            var hours = Math.floor(countdowns[index].countdown / 3600);
            var minutes = Math.floor((countdowns[index].countdown % 3600) / 60);
            var seconds = countdowns[index].countdown % 60;

            var formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);

            updateCountdownDisplay(index);

            if (countdowns[index].countdown <= 0) {
                countdowns[index].display.textContent = "Tiempo agotado";
                countdowns[index].display.classList.add("texto-agotado");
            } else {
                countdowns[index].display.textContent = formattedTime;
                countdowns[index].display.classList.remove("texto-agotado");
            }
        }, 1000);
    }

    function updateCountdownDisplay(index) {
        if (countdowns[index].display) {
            var hours = Math.floor(countdowns[index].countdown / 3600);
            var minutes = Math.floor((countdowns[index].countdown % 3600) / 60);
            var seconds = countdowns[index].countdown % 60;
            var formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
            countdowns[index].display.textContent = formattedTime;
        }
    }

    function pad(num) {
        return (num < 10 ? "0" : "") + num;
    }

    // Escuchar la entrada del código de barras
    document.getElementById('barcodeInput1').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            let scannedCode = e.target.value.trim();
            validateBarcode(scannedCode, 'miCheckbox1', 'barcodeInput1');
            e.target.value = ''; // Limpiar el campo de entrada
        }
    });
    document.getElementById('barcodeInput2').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            let scannedCode = e.target.value.trim();
            validateBarcode(scannedCode, 'miCheckbox2', 'barcodeInput2');
            e.target.value = ''; // Limpiar el campo de entrada
        }
    });
    document.getElementById('barcodeInput3').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            let scannedCode = e.target.value.trim();
            validateBarcode(scannedCode, 'miCheckbox3', 'barcodeInput3');
            e.target.value = ''; // Limpiar el campo de entrada
        }
    });
    document.getElementById('barcodeInput4').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            let scannedCode = e.target.value.trim();
            validateBarcode(scannedCode, 'miCheckbox4', 'barcodeInput4');
            e.target.value = ''; // Limpiar el campo de entrada
        }
    });
    document.getElementById('barcodeInput5').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            let scannedCode = e.target.value.trim();
            validateBarcode(scannedCode, 'miCheckbox5', 'barcodeInput5');
            e.target.value = ''; // Limpiar el campo de entrada
        }
    });
    document.getElementById('barcodeInput6').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            let scannedCode = e.target.value.trim();
            validateBarcode(scannedCode, 'miCheckbox6', 'barcodeInput6');
            e.target.value = ''; // Limpiar el campo de entrada
        }
    });
    document.getElementById('barcodeInput7').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            let scannedCode = e.target.value.trim();
            validateBarcode(scannedCode, 'miCheckbox7', 'barcodeInput7');
            e.target.value = ''; // Limpiar el campo de entrada
        }
    });
    document.getElementById('barcodeInput8').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            let scannedCode = e.target.value.trim();
            validateBarcode(scannedCode, 'miCheckbox8', 'barcodeInput8');
            e.target.value = ''; // Limpiar el campo de entrada
        }
    });
    document.getElementById('barcodeInput9').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            let scannedCode = e.target.value.trim();
            validateBarcode(scannedCode, 'miCheckbox9', 'barcodeInput9');
            e.target.value = ''; // Limpiar el campo de entrada
        }
    });

    // Validar el código de barras en Firestore
    async function validateBarcode(scannedCode, checkboxId, inputElement) {
        const docRef = doc(db, "usuarios", scannedCode);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("ID válido:", scannedCode);
            const nombre = userData.nombre;
            const saldo = userData.saldo - 10; // Descontar 10 unidades del saldo

            console.log("Usuario:", userData.nombre);
            console.log("Fecha de registro:", userData.fecha);
            console.log("Saldo:", saldo);

            // Actualizar el saldo en Firestore
            await updateDoc(docRef, { saldo: saldo });

            activateCheckbox(checkboxId, nombre, inputElement, saldo);
        } else {
            console.log("Usuario desconocido:", scannedCode);
        }
    }

    function activateCheckbox(checkboxId, nombre, inputElement, saldo) {
        const checkbox = document.getElementById(checkboxId);
        const inpElement = document.getElementById(inputElement); // Obtener el elemento input específico

        if (checkbox) {
            checkbox.checked = true;
            inpElement.value = nombre + " | Saldo: $" + saldo;
            checkbox.dispatchEvent(new Event('change'));
        } else {
            console.log(`No se encontró un checkbox con el ID: ${checkboxId}`);
        }
    }
});
