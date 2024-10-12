


var userelim = '';
$(document).ready(function () {


    cargarusuarios()


    $('#tusuarios').DataTable();
});


async function cargarusuarios() {

    // const request = await fetch('api/usuario', {
    const request = await fetch('https://rom.tinttodry.com/usuarios', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const usuarios = await request.json();

    console.log(usuarios);
    console.log("rf----->"+usuarios.rfid);

    let listadohtml = '';
    let contador = 1;
    for (let usuario of usuarios) {
        console.log("rfi -----Z="+usuario.rfid);
        const rfi = usuario.rfid;

        userelim=usuario.nombre;
        /* id entero es de esta forma   let btneditar = '<a href="#" onclick="editarusuario('+usuario.id+')" class="btn btn-warning btn-circle btn-sm">\n' +
               '    <i class="fas fa-edit"></i>\n' +
               '</a>';*/
        let btneditar = '<a href="#" onclick="editarusuario(\'' + usuario.rfid + '\')" class="btn btn-warning btn-circle btn-sm">\n' +
            '    <i class="fas fa-edit"></i>\n' +
            '</a>';
        let btneliminar = '<a href="#"  onclick="eliminarusuario(\'' + usuario.rfid + '\')" class="btn btn-danger btn-circle btn-sm">\n' +
            '                                        <i class="fas fa-trash"></i>\n' +
            '                                    </a>';

        let formatousuario = ' <tr>\n' +
            '                                    <td>' + contador + '</td>\n' +
            '                                    <td>' + usuario.rfid + '</td>\n' +
            '                                    <td>' + usuario.nombre + '</td>\n' +
            '                                    <td>' + usuario.correo + '</td>\n' +
            '                                    <td>' + usuario.contrasena + '</td>\n' +
            '                                    <td>' + usuario.telefono + '</td>\n' +
            '                                    <td>' + usuario.saldo + '</td>\n' +
            '                                    <td>' + usuario.tipo_usuario + '</td>\n' +
            '                                    <td>' + usuario.fecha + '</td>\n' +
            '                                    <td>' + btneditar+'</td>\n' +
            '                                    <td>' + btneliminar + '</td>\n' +
            '                                </tr>';

        listadohtml += formatousuario;
        contador++;
    }


//esta linea modifica el componente selecionado en este caso #tusuarios tbody(que es su cuerpo de la tabla
// y lo remplaza por el campo o varibale que le demos
    document.querySelector('#tusuarios tbody').outerHTML = listadohtml;
}

async function eliminarusuario(rfid){

    if (!confirm('Se eliminara el usuario '+userelim+'\n ¿ Estas seguro ?')){
        return;
    }
    console.log("id para eliminar = "+rfid)

    //const request = await fetch('elimusuario/'+rfid, {
    const request = await fetch('https://rom.tinttodry.com/elimusuario/'+rfid, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    location.reload();


}

let usuarioEditarId;

function editarusuario(rfid) {
    // Guardar el ID del usuario que se va a editar
    usuarioEditarId = rfid;
    console.log("el rfi en js es = "+usuarioEditarId);

    // Obtener los datos del usuario
    // fetch(`api/usuario/${id}`)
    // fetch(`/usuariofireb/${rfid}`)
    fetch(`https://rom.tinttodry.com/usuarioedit/${rfid}`)
        .then(response => response.json())
        .then(usuario => {
            // Rellenar el formulario con los datos del usuario
            document.getElementById('editNombre').value = usuario.nombre;
            document.getElementById('editCorreo').value = usuario.correo;
            document.getElementById('editTelefono').value = usuario.telefono;
            document.getElementById('editSaldo').value = usuario.saldo;
            document.getElementById('editFecha').value = usuario.fecha;
            document.getElementById('editContrasena').value = usuario.contrasena;
            document.getElementById('editRfid').value = usuario.rfid;
            document.getElementById('editUserId').value = usuario.id;

            // Mostrar el modal
            $('#editUserModal').modal('show');
        });
}

function guardarCambios() {
    let datos = {
        nombre: document.getElementById('editNombre').value,
        correo: document.getElementById('editCorreo').value,
        telefono: document.getElementById('editTelefono').value,
        saldo: document.getElementById('editSaldo').value,
        fecha: document.getElementById('editFecha').value,
        contrasena: document.getElementById('editContrasena').value,
        rfid: document.getElementById('editRfid').value
    };

    console.log("manda los datos .---->"+datos.rfid);
    console.log("manda los datos .---->"+datos.nombre);
    console.log("manda los datos .---->"+datos.correo);
    console.log("manda los datos .---->"+datos.contrasena);
    console.log("manda los datos .---->"+datos.telefono);
    console.log("manda los datos .---->"+datos.saldo);
    console.log("manda los datos .---->"+datos.fecha);




    // Elimina propiedades con valores vacíos
    for (let key in datos) {
        if (datos[key] === '') {
            delete datos[key];
        }
    }

    // fetch(`api/usuario/${usuarioEditarId}`, {
    // fetch(`/actualizarfire/${usuarioEditarId}`, {
    fetch(`https://rom.tinttodry.com/actualizar/${usuarioEditarId}`, {
        method: 'PATCH', // Usamos PATCH para actualizaciones parciales
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(response => {

            console.log("datos .---->"+datos.rfid);
            console.log(" datos .---->"+datos.nombre);
            console.log("datos .---->"+datos.correo);
            console.log("datos .---->"+datos.contrasena);
            console.log("datos .---->"+datos.telefono);
            console.log("datos .---->"+datos.saldo);
            console.log("datos .---->"+datos.fecha);
            if (response.ok) {
                alert('Usuario actualizado con éxito');
                $('#editUserModal').modal('hide');
                location.reload(); // Recargar la página para ver los cambios
            } else {
                alert('Error al actualizar el usuario');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar el usuario');
        });
}

