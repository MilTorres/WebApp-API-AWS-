$(document).ready(function () {

});


async function registrarusuarios() {

    let datos = {};
    //estamos creando el objeto y asignando el nombre de las propiedades(atributos) esos nombres deben
    //ser igual a como aparecen en models en la clase usuario donde creamos el objeto y sus atributos
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
    datos.nombre = document.getElementById('txtnombre').value;
    datos.correo = document.getElementById('txtcorreo').value;
    datos.contrasena = document.getElementById('txtcontrasena').value;
    let contraseña = document.getElementById('txtcontrasena').value;
    let repetircontraseña = document.getElementById('txtrepetircontraseña').value;
    let telefono = datos.telefono = document.getElementById('txttelefono').value;
    let saldo = datos.saldo = document.getElementById('txtsaldo').value;


    function obtenerFechaHora() {
        // Crear un objeto Date
        let ahora = new Date();

        // Obtener las partes individuales de la fecha y hora
        let dia = String(ahora.getDate()).padStart(2, '0');
        let mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Enero es 0
        let año = ahora.getFullYear();
        let horas = String(ahora.getHours()).padStart(2, '0');
        let minutos = String(ahora.getMinutes()).padStart(2, '0');
        let segundos = String(ahora.getSeconds()).padStart(2, '0');

        // Formatear la fecha y hora en el formato deseado
        let fecha = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;

        // Asignar el valor formateado a una variable


        // También puedes devolver la fecha si es necesario
        return fecha;
    }

    // Llamar a la función y asignar el resultado a la variable "fecha"
    let fecha = obtenerFechaHora();
    datos.fecha = fecha;
    // Mostrar la fecha en la consola



//verifica que no exitan campos vacios
    if (!datos.rfid || !datos.nombre || !datos.correo || !datos.telefono || !datos.contrasena || !repetircontraseña || !datos.saldo) {
        alert('Todos los campos deben estar llenoos')
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
        alert('Las controseñas no coinciden')
        return;
    }

    console.log("rfid=      " + datos.rfid);
    console.log("nombre=      " + datos.nombre);
    console.log("correo=      " + datos.correo);
    console.log("contrasena=      " + datos.contrasena);
    console.log("telefono=      " + datos.telefono);
    console.log("saldo=      " + datos.saldo);
    console.log("fecha=      " + datos.fecha);



    //const request = await fetch('api/usuariofirebase', {
        const request = await fetch('http://prb1-env.eba-3p9pi4mv.us-east-2.elasticbeanstalk.com/registrarusuario', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos) //convierte el Objeto String a Objeto con formato JSON
    });
    alert("la cuenta fue creada con exito")
    window.location.href = 'registro.html'

}

