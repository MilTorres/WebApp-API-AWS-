const express = require('express');
const sql = require('mssql');
const app = express();
// Configuración de la conexión a SQL Server
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

   /* finally {
        // Cerrar la conexión
        await sql.close();
        console.log('Conexión cerrada.');
    }*/
}

// Llamar a la función para conectar y ejecutar la consulta
connectAndQuery();
console.log('1.');

app.get('/check_uid', (req, res) => {
    const uid = req.query.uid;
    const connection = connectAndQuery();

    if (!connection) {
        return res.json({ status: 'error', message: 'No se pudo conectar a la base de datos' });
    }

    connection.query('SELECT * FROM rfid_cards WHERE uid = ?', [uid], (err, results) => {
        cerrar_bd(connection);

        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            return res.json({ status: 'error', message: 'Error en la consulta a la base de datos' });
        }

        if (results.length > 0) {
            return res.json({ status: 'registered' });
        } else {
            return res.json({ status: 'not registered' });
        }
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});