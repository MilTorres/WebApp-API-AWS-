console.log("Hola, Conecto a APP.JS");

const express = require('express');
const sql = require('mssql');
const app = express();
const port = 5000;

// Configuración de la base de datos
const config = {
    user: 'sa',
    password: '1234',
    server: '127.0.0.1', // Puedes cambiarlo según tu configuración
    database: 'bd_maerik',
    options: {
        encrypt: false, // Cambia a true si estás en Azure
        enableArithAbort: true // Habilita el manejo seguro de errores
    }
};

function conectarBD() {
    const connection = mysql.createConnection(dbConfig);

    connection.connect((error) => {
        if (error) {
            console.error('Error al conectarse a MySQL:', error);
        } else {
            console.log('Conexión establecida correctamente.');
        }
    });

    return connection;
}

async function connectAndQuery() {
    try {
        // Conectar a SQL Server
        await sql.connect(config);
        console.log('Conexión establecida.');

        // Ejecutar una consulta
        const result = await sql.query`SELECT * FROM usuarios_local`;
        console.dir(result.recordset);

    } catch (err) {
        console.error('Error al conectar o ejecutar consulta:', err);
    }
    }



// Ejemplo de uso
connectAndQuery();
console.log('1.');

app.get('/check_uid', (req, res) => {
    const uid = req.query.uid;
    const connection = conectarBD();

    connection.query('SELECT saldo FROM usuarios_local WHERE rfid = ?', [uid], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.json({ status: 'error', message: 'No se pudo conectar a la base de datos' });
            cerrarBD(connection);
            return;
        }

        if (results.length > 0) {
            const saldo = results[0].saldo;
            console.log(`Código recibido y saldo: ${uid}, ${saldo}`);

            if (saldo >= 10) {
                console.log('Saldo suficiente');
                res.json({ status: 'registered' });
            } else {
                console.log('Saldo insuficiente');
                res.json({ status: 'not registered' });
            }
        } else {
            res.json({ status: 'not registered' });
        }

        cerrarBD(connection);
    });
});

app.listen(port, () => {
    console.log(`App corriendo en http://192.168.1.69:${port}`);
});
