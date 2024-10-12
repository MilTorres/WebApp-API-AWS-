import {
    onGetTasks,
    saveTask,
    deleteTask,
    getTask,
    updateTask,
    deleteTask2,
    deleteTask3,
    deleteTask4,
    deleteTask5,

} from "./FirebasePersonal.js";

const taskForm = document.getElementById("task-form");
const taskForm2 = document.getElementById("btn-task-form");
const tasksContainer = document.getElementById("tasks-container");
const tablahtml = document.getElementById("tablahtml");

let editStatus = false;
let id = "";


fetch('EliminarBDLPersonal.php')


window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });

    onGetTasks((querySnapshot) => {


        tablahtml.innerHTML = "";

        querySnapshot.forEach((doc) => {

            const task = doc.data();

            console.log("Nombre = " + task.nombre);
            console.log("Apellido = " + task.apellido);
            console.log("Correo = " + task.correo);
            console.log("Contraseña = " + task.contraseña);
            console.log("Bateria    = " + task.bateria);
            console.log("Cargo = " + task.cargo);
            const idp = task.idp;
            const nom = task.nombre;
            const ape = task.apellido;
            const cor = task.correo;
            const con = task.contraseña;
            const bat = task.bateria;
            const carg = task.cargo;
            const esta = task.estatus;

            getinfo();
            tablahtml.innerHTML += `

       <link rel="stylesheet" href="CSS-Solicitudes.css">
       <form class="tablaimp">
          
              <th   style="text-align: center" align="center"> ${doc.data().idp}</th>
          <th   style="text-align: center" align="center"> ${doc.data().nombre}</th>
            <td  align="center">${doc.data().apellido}</td>
            <td   align="center">${doc.data().correo}</td>
            <td   align="center">${doc.data().bateria}</td>
            <td   align="center">${doc.data().contraseña}</td>
          <td   align="center">${doc.data().cargo}</td>
            <td   align="center">${doc.data().estatus}</td>
          
     
          
      <td class="btneditt"   align="center"  
      data-toggle="modal" data-target="#ModalModifica" > <button class="btn1 btn-secondary btn-edit"   data-id="${doc.id}">
         🖉 Modificar
      </button></td>
       <td    align="center"    > <button class="btn2 btn-secondary btn-delete" id="btn-delete"  data-id="${doc.id}">
        🗑 Eliminar
      </button></td>
  



      
   </form>
   
   

   
   `;

            function getinfo() {
                fetch('CrearBDLPersonal.php?noma=' + nom +
                    "&idp=" + idp +
                    "&ape=" + ape +
                    "&cor=" + cor +
                    "&con=" + con +
                    "&bat=" + bat +
                    "&carg=" + carg +
                    "&esta=" + esta)
            }


        });


        var b;
        b = document.getElementById("btn-delete");
        b.innerHTML = ("  🗑 Eliminar")
        const btnsDelete = tablahtml.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async ({target: {dataset}}) => {
                try {
                    await deleteTask(dataset.id);
                    await deleteTask2(dataset.id);
                    await deleteTask3(dataset.id);
                    await deleteTask4(dataset.id);
                    await deleteTask5(dataset.id);


                } catch (error) {
                    console.log(error);
                }
            })
        );

        const btnsEdit = tablahtml.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {

            btn.addEventListener("click", async (e) => {
                try {

                    const doc = await getTask(e.target.dataset.id);
                    const task = doc.data();

                    taskForm["modidp"].value = task.idp;
                    taskForm["modnombre"].value = task.nombre;
                    taskForm["modapellidos"].value = task.apellido;
                    taskForm["modcorreo"].value = task.correo;
                    taskForm["modcontraseña"].value = task.contraseña;
                    taskForm["modcargo"].value = task.cargo;
                    taskForm["modestatus"].value = task.estatus;
                    editStatus = true;
                    id = doc.id;


                    taskForm["btn-task-form"].innerText = "Guardar Usuario";

                } catch (error) {
                    console.log(error);

                }
            });
        });
    });
});
const btnacept = tablahtml.querySelectorAll(".btn-acep");
btnacept.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
        try {

            const doc = await getTask(e.target.dataset.id);
            const task = doc.data();
            taskForm["modidp"].value = task.idp;
            taskForm["modnombre"].value = task.nombre;
            taskForm["modapellidos"].value = task.apellido;
            taskForm["modcorreo"].value = task.correo;
            taskForm["modcontraseña"].value = task.contraseña;
            taskForm["modcargo"].value = task.cargo;
            taskForm["modestatus"].value = task.estatus;

            editStatus = true;
            id = doc.id;
            taskForm2["btn-task-form"].innerText = "Guardar Usuario";

        } catch (error) {
            console.log(error);

        }
    });
});


taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const idp = taskForm["modidp"];
    const nombre = taskForm["modnombre"];
    const apellido = taskForm["modapellidos"];
    const correo = taskForm["modcorreo"];
    const contraseña = taskForm["modcontraseña"];
    const cargo = taskForm["modcargo"];
    const estatus = taskForm["modestatus"];

    try {
        if (!editStatus) {
            await (idp.value, nombre.value, apellido.value, correo.value, contraseña.value, cargo.value, estatus.value);
        } else {
            await updateTask(id, {
                idp: idp.value,
                nombre: nombre.value,
                apellido: apellido.value,
                correo: correo.value,
                contraseña: contraseña.value,
                cargo: cargo.value,
                estatus: estatus.value,
            });
            Swal.fire(
                '¡Correcto!',
                '¡Modificacion' + nombre.value + 'Guardada Exitosamente!',
                'success'
            );
            editStatus = false;


        }


        nombre.focus();
    } catch (error) {
        console.log(error);
    }
});
