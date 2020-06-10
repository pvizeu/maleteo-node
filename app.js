const express = require('express');
const bodyParser= require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
var app = express();

//Rutas cargadas



//mideleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//cookies para google
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))
//cors

//google
//app.get('/auth/google',
  //  passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' });

///app.get('/auth/google/callback',
   // passport.authenticate('google', { failureRedirect: '/login' }),
    //function(req, res) {
      //  res.redirect('/');
    //});
//Rutas



//Exportar
module.exports = app;