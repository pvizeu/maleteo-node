const express = require('express');
const bodyParser= require('body-parser');
const passport = require('passport');
const multer = require('multer');
const cookieSession = require('cookie-session');
const path = require('path');
require('dotenv').config();
var app = express();

//Rutas cargadas
const userRoutes = require('./routes/users')


//mideleware

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Rutas
app.use('/', userRoutes);




app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);
    res.sendStatus(err.status || 500);
});
//Exportar
module.exports = app;