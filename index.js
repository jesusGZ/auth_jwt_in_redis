const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const https = require('https');

const Config = require("./models/constants/config");
let config = new Config();

const cabeceras = require('./middlewares/verbosHttp.middleware')
app.use(cabeceras)

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '500kb', extended: true}));
app.use(bodyParser.urlencoded({limit: '500kb', extended: true}));



mongoose.connect(`mongodb://${config.mongo().host}:${config.mongo().port}/${config.mongo().db}?authSource=admin`, {
      user: `${config.mongo().user}`, pass: `${config.mongo().pass}`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

require('./routes/index.route')(app);
require('./routes/default/index')(app);

// inicializacion del servidor
http.createServer(app).listen( config.service().port, () =>{
  console.log('[HTTP] El servidor esta escuchando en el puerto:' + config.service().port); 
}); 

/* https.createServer(app).listen( config.service().port, () =>{
  console.log('[HTTPS] El servidor esta escuchando en el puerto:' + config.service().port); 
});  */