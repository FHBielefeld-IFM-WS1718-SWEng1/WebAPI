const express = require('express');   // Die express komponente ermöglicht einfaches erstellen von Routen
var logger = require('morgan');     // Logger für Requests
const bodyParser = require('body-parser');    // erstellt aus dem Request ein Javascript Object
const checkToken = require('./helper/authenticate');
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
const rating = require('./routes/Rating');
// Globale Variablen
var config = require('../databaseconfig.json');

const sequelize = new Sequelize(config.dbname, config.username, config.password, config.opts);
const models = require("./models/MainModels.js")(sequelize, Sequelize);
const app = express();                // erstellen einer Express Node.js Application

const page404 = (req, res, next) => next({status: 404});

app.use(cors());
// app.use(logger('dev'));
app.use(bodyParser.json());                             //
app.use(bodyParser.urlencoded({extended: false}));      //
if (process.env.NODE_ENV === 'dev') {
    console.log(process.env.NODE_ENV);
    sequelize
        .sync({force: true})
        .then(function (err) {
            console.log("Datenbank wurde erfolgreich neuerstellt!");
            for (let i = 0; i < 10; i++) {
                models.User.create({
                    name: "test" + i,
                    email: "test" + i + "@test" + i + ".de",
                    password: "lsrjXOipsCRBeL8o5JZsLOG4OFcjqWprg4hYzdbKCh4="
                });

                models.APIKey.create({user_id: 1 + i, apiKey: "l" + (1 + i)});
            }
            [
                {name: "Super Party 1", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 1},
                {name: "Super Party 2", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 2},
                {name: "Super Party 3", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 3},
                {name: "Super Party 4", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 4},
                {name: "Super Party 5", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 5},
                {name: "Super Party 6", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 6},
                {name: "Super Party 7", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 7},
                {name: "Super Party 8", location: "daheim", startdate: "2013-10-05T14:48:00.000Z", user_id: 8}
            ].forEach((value) => {
                models.Party.create(value);
            });
            [
                [1, 2],
                [1, 3],
                [1, 4],
                [2, 3],
                [2, 4],
                [3, 4],
                [4, 5],
                [6, 7],
                [7, 8]
            ].forEach(value => {
                models.Contactlist.create({user_id1: value[0], user_id2: value[1]});
                models.Guestlist.create({user_id: value[0], party_id: value[1]});
            });
            [
                {party_id: 1, text: "Freitext1", status: 0},
                {party_id: 1, text: "Freitext2", status: 0},
                {party_id: 2, text: "Freitext3", status: 0},
                {party_id: 3, text: "Freitext4", status: 0},
                {party_id: 4, text: "Freitext5", status: 0},
                {party_id: 5, text: "Freitext6", status: 0},
                {party_id: 6, text: "Freitext7", status: 0},
                {party_id: 1, text: "Freitext8", status: 0},
                {party_id: 1, text: "Freitext9", status: 0}
            ].forEach(value => {
                models.Todolistitem.create(value);
                value.user_id = value.party_id;
                models.Task.create(value);
            });

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
app.use('/logout', logout);
app.use('/user/contact', contactlist);
app.use('/user', users);
app.use('/party/guest', guestlist);
app.use('/party/rating', rating);
app.use('/party/todo', todolist);
app.use('/party/task', tasklist);
app.use('/party', parties);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next({status: 404, message: 'Not Found'});
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    if (err.status === 404) {
        err.message = "Die gewünschte Seite ist nicht vorhandden!";
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