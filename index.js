const express = require('express');
const bodyParser = require('body-parser');
const { dbConnection } = require('./db/config');
const cors = require('cors')
require ('dotenv').config({path: 'variables.env'});

const app = express();

// base de datos
dbConnection();

const whiteList = [ process.env.URL_FRONTEND ];

const corsOption = {
    origin: (origin, callback) => {
        const existe = whiteList.some( dominio => dominio === origin );
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

// CORS
app.use(cors(corsOption));

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