const express = require('express');
const sql = require('mssql');
const app = express();
// Configuración de la conexión a SQL Server
const config = {
    user: 'sa',
    password: '1234',
    server: '127.0.0.1', // Puedes cambiarlo según tu configuración
    database: 'maerik',
    options: {
        encrypt: false, // Cambia a true si estás en Azure
        enableArithAbort: true // Habilita el manejo seguro de errores
    }
};

async function connectAndQuery() {
    try {
        // Conectar a SQL Server
        await sql.connect(config);
        console.log('Conexión establecida.');

        // Ejecutar una consulta
        const result = await sql.query`SELECT * FROM rfid_cards`;
        console.dir(result.recordset);

    } catch (err) {
        console.error('Error al conectar o ejecutar consulta:', err);
    } finally {
        // Cerrar la conexión
        await sql.close();
        console.log('Conexión cerrada.');
    }
}





// Datos simulados obtenidos de la base de datos (simulando respuesta de una API)
const dataFromDatabase = [
    { id: 1, nombre: 'Ejemplo 1', correo: 'ejemplo1@example.com', telefono: '123456789', saldo: 100 },
    { id: 2, nombre: 'Ejemplo 2', correo: 'ejemplo2@example.com', telefono: '987654321', saldo: 200 },
    { id: 3, nombre: 'Ejemplo 3', correo: 'ejemplo3@example.com', telefono: '456789123', saldo: 300 },
];

// Función para cargar los datos en la tabla HTML
function loadRFIDCards() {
    const tableBody = document.getElementById('rfidTableBody');

    // Limpiar la tabla antes de agregar nuevas filas
    tableBody.innerHTML = '';

    // Construir las filas de la tabla con los datos obtenidos
    dataFromDatabase.forEach(card => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${card.id}</td>
            <td>${card.nombre}</td>
            <td>${card.correo}</td>
            <td>${card.telefono}</td>
            <td>${card.saldo}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Llamar a la función para cargar los datos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadRFIDCards();
});
