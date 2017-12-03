const express = require('express');   // Die express komponente ermöglicht einfaches erstellen von Routen
var logger = require('morgan');     // Logger für Requests
const bodyParser = require('body-parser');    // erstellt aus dem Request ein Javascript Object
const checkToken = require('./auth/authenticate');
const Sequelize = require('sequelize');
// alle routen importieren
const register = require('./routes/register');
const parties = require('./routes/parties');  // Das erste Routen Module
const users = require('./routes/user');
const login = require('./routes/login');
const logout = require('./routes/logout');
// Globale Variablen
var config = require('../databaseconfig.json');

const sequelize = new Sequelize(config.dbname, config.username, config.password, config.opts);
const models = require("./models/MainModels.js")(sequelize, Sequelize);
const app = express();                // erstellen einer Express Node.js Application

// app.use(logger('dev'));
app.use(bodyParser.json());                             //
app.use(bodyParser.urlencoded({extended: false}));      //

// Hier werden die Routen eingetragten die public sind
app.use(function(req,res,next){
    req.models = models;
    next();
});
app.use('/login',login);
app.use('/logout', logout);
app.use('/register', register);
app.use(function (err, req, res, next) {
    if (checkToken(req)) {
        next();
    } else if(!err){
        var err = new Error('API Key ungültig!');
        err.status = 403;
        next(err);
    } else {
        next(err);
    }
});
// Hier werden die Routen eingetragen die Login erfordern
app.use('/users', users);
app.use('/parties', parties);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({"error": res.locals.message});
});

// erstellen eines HTTP servers der Auf Port 8080 hört
var listener = app.listen(8080, function () {

   // console.log('API listening on ' + listener.address().port);
});


module.exports = listener;