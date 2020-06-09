const express = require('express');
const bodyParser= require('body-parser');

var app = express();

//Rutas cargadas



//mideleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//cors

//Rutas



//Exportar
module.exports = app;