console.log("Conecta con clase Registros.js");

console.log("1");
async function registrarusuarios() {
    import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import {getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configura Firebase
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

// Manejar el envío del formulario
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario


        // Obtener los valores del formulario
        const id = document.getElementById('id').value;
        const numericValue = parseInt(id, 10);


        const hexValue = numericValue.toString(16).toUpperCase();
        const hexs = hexValue.substring(6, 8) + hexValue.substring(4, 6) + hexValue.substring(2, 4) + hexValue.substring(0, 2);


        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const saldo = document.getElementById('saldo').value;

        try {
            // Añadir un nuevo documento a la colección "usuarios" con el ID especificado
            await setDoc(doc(db, "usuarios", hexs), {
                nombre: name,
                correo: email,
                telefono: phone,
                saldo: saldo,
                fecha: new Date()
            });
            console.log("Documento escrito con ID: ", hexs);
            alert("Registro exitoso");

            // Limpiar el formulario después del envío
            document.getElementById('registerForm').reset();
        } catch (e) {
            console.error("Error añadiendo el documento: ", e);
            alert("Error al registrar. Intenta de nuevo.");
        }
    });

}
