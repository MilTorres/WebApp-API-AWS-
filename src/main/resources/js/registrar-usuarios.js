$(document).ready(function () {

});

async function registrarusuarios() {
    let datos = {};

    // Asignación de valores a los atributos del objeto 'datos'
    datos.rfid = document.getElementById('txtrfid').value;
    const id = datos.rfid;
    const numericValue = parseInt(id, 10);
    const hexValue = numericValue.toString(16).toUpperCase();
    const hexs = hexValue.substring(6, 8) + hexValue.substring(4, 6) + hexValue.substring(2, 4) + hexValue.substring(0, 2);
    try {
        datos.rfid = hexs;
    } catch (e) {
        console.error("Error añadiendo el RFID: ", e);
        alert("Error al registrar. Intenta de nuevo.");
    }

    // Resto de asignaciones
    datos.nombre = document.getElementById('txtnombre').value;
    datos.correo = document.getElementById('txtcorreo').value;
    datos.contrasena = document.getElementById('txtcontrasena').value;
    let contraseña = document.getElementById('txtcontrasena').value;
    let repetircontraseña = document.getElementById('txtrepetircontraseña').value;
    let telefono = datos.telefono = document.getElementById('txttelefono').value;
    let saldo = datos.saldo = document.getElementById('txtsaldo').value;

    // Obtener el tipo de usuario seleccionado
    datos.tipo_usuario = document.getElementById('userType').value; // Nuevo campo para el tipo de usuario

    function obtenerFechaHora() {
        let ahora = new Date();
        let dia = String(ahora.getDate()).padStart(2, '0');
        let mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Enero es 0
        let año = ahora.getFullYear();
        let horas = String(ahora.getHours()).padStart(2, '0');
        let minutos = String(ahora.getMinutes()).padStart(2, '0');
        let segundos = String(ahora.getSeconds()).padStart(2, '0');

        let fecha = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
        return fecha;
    }

    let fecha = obtenerFechaHora();
    datos.fecha = fecha;

    // Verificación de campos vacíos
    if (!datos.rfid || !datos.nombre || !datos.correo || !datos.telefono || !datos.contrasena || !repetircontraseña || !datos.saldo || !datos.tipo_usuario) {
        alert('Todos los campos deben estar llenos');
        return;
    }
    if (/[a-zA-Z]/.test(telefono)) {
        alert('El teléfono no debe contener letras');
        return;
    }
    if (/[a-zA-Z]/.test(saldo)) {
        alert('El saldo no debe contener letras');
        return;
    }
    if (repetircontraseña != contraseña) {
        alert('Las contraseñas no coinciden');
        return;
    }

    console.log("rfid=      " + datos.rfid);
    console.log("nombre=      " + datos.nombre);
    console.log("correo=      " + datos.correo);
    console.log("contrasena=      " + datos.contrasena);
    console.log("telefono=      " + datos.telefono);
    console.log("saldo=      " + datos.saldo);
    console.log("tipo_usuario=  " + datos.tipo_usuario); // Mostrar el tipo de usuario en la consola
    console.log("fecha=      " + datos.fecha);

    const request = await fetch('https://rom.tinttodry.com/registrarusuario', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos) // Convierte el objeto a JSON
    });
console.log("los datos son ---> "+datos)
    alert("La cuenta fue creada con éxito");
    window.location.href = 'registro.html';
}
