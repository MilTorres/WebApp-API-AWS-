const WebSocket = require('ws');
const sql = require('mssql');

// Configuración de la base de datos MSSQL
const config = {
    user: 'sa',
    password: '1234',
    server: 'localhost',
    database: 'bd_maerik',
    options: {
        encrypt: true // Ajusta según tu configuración
    }
};

// Crear un servidor WebSocket
const wss = new WebSocket.Server({ port: 5021 });

wss.on('connection', ws => {
    console.log('Cliente conectado');

    // Enviar un mensaje de bienvenida al cliente
    ws.send('Bienvenido al servidor WebSocket');

    // Manejar mensajes recibidos del cliente
    ws.on('message', message => {
        console.log('Mensaje recibido del cliente:', message);
        // Aquí podrías actualizar el estado en la base de datos si es necesario
        // Ejemplo: actualizarEstadoEnBD(message);
    });

    // Manejar el cierre de la conexión
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });

    // Manejar errores
    ws.on('error', error => {
        console.error('Error en WebSocket:', error);
    });

    // Monitorizar cambios en la base de datos
    sql.connect(config).then(pool => {
        const request = new sql.Request(pool);
        setInterval(async () => {
            try {
                const result = await request.query('SELECT estado FROM lavadoras');
                const estado = result.recordset[0].estado;
                ws.send(estado.toString()); // Enviar el estado al cliente
            } catch (err) {
                console.error('Error al consultar la base de datos:', err);
            }
        }, 5000); // Verificar cada 5 segundos
    }).catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });
});
