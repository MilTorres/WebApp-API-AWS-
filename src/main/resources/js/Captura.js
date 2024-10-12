

console.log("Entra a clase Captura.js")

//                 FIREBASE CONECCION
// Importar los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA_Kr58FvmuP1MHIR5L0J1dvwIGKZwPAlQ",
    authDomain: "maeriklavanderias-489e4.firebaseapp.com",
    projectId: "maeriklavanderias-489e4",
    storageBucket: "maeriklavanderias-489e4.appspot.com",
    messagingSenderId: "672533341215",
    appId: "1:672533341215:web:0f6c2b869d2ed57416212a"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var countdowns = [
        { display: document.getElementById("checkbox1"), countdown: 15 * 60, timer: null },
        { display: document.getElementById("checkbox2"), countdown: 15 * 60, timer: null },
        // Añade más countdowns según sea necesario
    ];

    checkboxes.forEach(function(checkbox, index) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                startCountdown(index);
            } else {
                clearInterval(countdowns[index].timer);
                countdowns[index].countdown = 15 * 60;
                updateCountdownDisplay(index);
                countdowns[index].display.classList.add("texto-reinicio");
                setTimeout(function() {
                    countdowns[index].display.classList.remove("texto-reinicio");
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
    document.getElementById('barcodeInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            let scannedCode = e.target.value.trim();
            validateBarcode(scannedCode);
            e.target.value = ''; // Limpiar el campo de entrada
        }
    });

    // Validar el código de barras en Firestore
    async function validateBarcode(scannedCode) {
        const docRef = doc(db, "codigos_barra", scannedCode);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("ID válido:",  scannedCode);
            console.log("Usuario:", userData.usuario );
            console.log("Fecha de registro:", userData.fecha );
            console.log("Saldo:", userData.saldo );
            activateCheckbox(scannedCode);
        } else {
            console.log("Usuario desconocido:", scannedCode);
        }
    }

    function activateCheckbox(scannedCode) {
        checkboxes.forEach(function(checkbox) {
            console.log("SE ACTIVA CHECK" );

                checkbox.checked = true;
                checkbox.dispatchEvent(new Event('change'));

        });
    }
});
