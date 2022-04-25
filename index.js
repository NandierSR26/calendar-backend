const express = require('express');
const bodyParser = require('body-parser');
const { dbConnection } = require('./db/config');
const cors = require('cors')
require ('dotenv').config({path: 'variables.env'});

const app = express();

// base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio publico
app.use( express.static('public') );

// lectura y parseo del body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
})