const express = require('express');   // Die express komponente ermöglicht einfaches erstellen von Routen
var logger = require('morgan');     // Logger für Requests
const bodyParser = require('body-parser');    // erstellt aus dem Request ein Javascript Object
const Sequelize = require('sequelize');
const cors = require('cors');
// alle routen importieren
const register = require('./routes/register');
const parties = require('./routes/party');  // Das erste Routen Module
const users = require('./routes/user');
const login = require('./routes/login');
const logout = require('./routes/logout');
const todolist = require('./routes/todolist');
const contactlist = require('./routes/contactlist');
const guestlist = require('./routes/guestlist');
const tasklist = require('./routes/tasklist');
const rating = require('./routes/rating');
const image = require('./routes/image');
const comment = require('./routes/comment');
const gallery = require('./routes/gallery');
const voting = require('./routes/voting');
// Globale Variablen
var config = require('../databaseconfig.json');
// Helper Funktionen
const checkToken = require('./helper/authenticate');
const initdb = require('./helper/dbinit');
const util = require('./helper/utilities');

const sequelize = new Sequelize(config.dbname, config.username, config.password, config.opts);
const models = require("./models/MainModels.js")(sequelize, Sequelize);
const app = express();                // erstellen einer Express Node.js Application

const page404 = (req, res, next) => next({status: 404});

app.use(cors());
// app.use(logger('dev'));
app.use(bodyParser.json({limit: '400kb'}));                             //
app.use(bodyParser.urlencoded({extended: false}));      //
if (process.env.NODE_ENV === 'dev') {
    console.log(process.env.NODE_ENV);
    sequelize
        .sync({force: true})
        .then(function (err) {
            initdb(models)
            console.log("Datenbank wurde erfolgreich neuerstellt!");

        }, function (err) {
            console.log('Beim erstellen der Datenbank ist folgender Fehler aufgetretten:', err);
        });
}

// Hier werden die Routen eingetragten die public sind
app.use(function (req, res, next) {
    req.models = models;
    next();
});

app.use('/login', login);
app.use('/register', register);
app.use('/login', page404);
app.use('/register', page404);

app.use(async function (req, res, next) {
    try {
        let temp = await checkToken(req);
        next();
    } catch (err) {
        next(err);
    }
});
// Hier werden die Routen eingetragen die Login erfordern
app.use('/image', image);
app.use('/logout', logout);
app.use('/user/contact', contactlist);
app.use('/user', users);
app.use('/party/guest', guestlist);
app.use('/party/rating', rating);
app.use('/party/todo', todolist);
app.use('/party/task', tasklist);
app.use('/party/comment', comment);
app.use('/party/vote', voting);
app.use('/party', parties);
app.use('/comment', comment);
app.use('/gallery',gallery);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next({status: 404, message: 'Not Found'});
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    if (err.status === 404 && !util.hasKey(err, 'message')) {
        err.message = "Die gewünschte Seite ist nicht vorhanden!";
    }
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    res.status(err.status || 500);
    res.json({"error": res.locals.message});
});
// erstellen eines HTTP servers der Auf Port 8080 hört
var listener = app.listen(8080, function () {
    // console.log('API listening on ' + listener.address().port);
});
module.exports = {listener: listener, sequelize: sequelize};