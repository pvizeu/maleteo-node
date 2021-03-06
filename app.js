const express = require('express');
var createError = require('http-errors');
const bodyParser= require('body-parser');
var cookieParser = require('cookie-parser'); 
var logger = require('morgan');
const passport = require('passport');
const multer = require('multer');
const cookieSession = require('cookie-session');
const path = require('path');
require('dotenv').config();
const mongoMiddlewares = require('./middlewares/mongo');

//objeto app
var app = express();

//Rutas cargadas
const definitiveRoutes = require('./routes/definitiveRoutes');
const userRoutes = require('./routes/users');
const alejandroRoutes = require('./routes/pruebasalejandro');
const pedroRoutes = require('./routes/pruebaspedro');

//mideleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(mongoMiddlewares);      //conexion a Mongo

//Rutas
app.use('/', definitiveRoutes);
app.use('/', userRoutes);
app.use('/pruebasAle', alejandroRoutes);
app.use('/pruebasped', pedroRoutes);


app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);
    res.sendStatus(err.status || 500);
});
//Exportar
module.exports = app;