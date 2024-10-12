console.log("entra a login.js");

const form = document.querySelector('form');
const userNameInput = document.getElementById('usuario');
const passwordInput = document.getElementById('contraseña');
const errorMessage = document.createElement('p'); // Para mostrar mensajes de error
errorMessage.style.color = 'red'; // Estilo del mensaje de error

console.error('usuario y contraseña:', userNameInput, passwordInput);

// Función para enviar datos al endpoint
async function loginUser(email, password) {
    try {
       // const response = await fetch('/login', {
        const response = await fetch('https://rom.tinttodry.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la respuesta de la red');
        }

        const data = await response.json();
        console.log('Login exitoso:', data);
        window.location.href = './control.html';

    } catch (error) {
        console.error('Error en el login:', error);

        // Verifica si los campos están vacíos y muestra una alerta
        if (!userNameInput.value.trim() || !passwordInput.value.trim()) {


            alert('El usuario o contraseña son incorrectos. \n Por favor, ingréselos nuevamente.');
        console.log("El usuario o contraseña son incorrectos. \n Por favor, ingréselos nuevamente.");
        } else {
            console.log('Formulario enviado con:', userNameInput.value.trim(), passwordInput.value.trim());
        }

        //window.location.reload();
        errorMessage.textContent = 'El usuario o la contraseña son incorrectas.';
        form.appendChild(errorMessage);
    }
}

// Maneja el envío del formulario
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Obtén los valores del formulario
    const userName = userNameInput.value.trim();
    const password = passwordInput.value.trim();

    // Verifica que los campos no estén vacíos
    if (!userName || !password) {
        // Elimina mensaje de error previo, si existe
        if (form.contains(errorMessage)) {
            form.removeChild(errorMessage);
        }
        errorMessage.textContent = 'Por favor, ingrese nombre de usuario y contraseña.';

        form.appendChild(errorMessage);
        return;
    }

    // Llamar a la función para enviar los datos
    loginUser(userName, password);
});
