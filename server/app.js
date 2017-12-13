const express = require('express');   // Die express komponente ermöglicht einfaches erstellen von Routen
var logger = require('morgan');     // Logger für Requests
const bodyParser = require('body-parser');    // erstellt aus dem Request ein Javascript Object
const checkToken = require('./auth/authenticate');
const Sequelize = require('sequelize');
// alle routen importieren
const register = require('./routes/register');
const parties = require('./routes/party');  // Das erste Routen Module
const users = require('./routes/user');
const login = require('./routes/login');
const logout = require('./routes/logout');
const contactlist = require('./routes/contactlist');
// Globale Variablen
var config = require('../databaseconfig.json');

const sequelize = new Sequelize(config.dbname, config.username, config.password, config.opts);
const models = require("./models/MainModels.js")(sequelize, Sequelize);
const app = express();                // erstellen einer Express Node.js Application

const page404 = (req, res, next) => next({status: 404});


// app.use(logger('dev'));
app.use(bodyParser.json());                             //
app.use(bodyParser.urlencoded({extended: false}));      //
if (process.env.NODE_ENV === 'dev') {
    console.log(process.env.NODE_ENV);
    sequelize
        .sync({force: true})
        .then(function (err) {
            console.log("Datenbank wurde erfolgreich neuerstellt!");
            models.User.create({name:"test", email:"test@test.de", password:"lsrjXOipsCRBeL8o5JZsLOG4OFcjqWprg4hYzdbKCh4="});
            models.User.create({name:"test", email:"test2@test2.de", password:"lsrjXOipsCRBeL8o5JZsLOG4OFcjqWprg4hYzdbKCh4="});
            models.APIKey.create({user_id:1, apiKey:"C5zTe3jJ3F54Zk4mPEty8-xTDvf4R51eFx0pRfB8VhA"});
            [
                {name:"Super Party 1",location: "daheim",startdate: "2013-10-05T14:48:00.000Z", user_id:1},
                {name:"Super Party 2",location: "daheim",startdate: "2013-10-05T14:48:00.000Z", user_id:1},
                {name:"Super Party 3",location: "daheim",startdate: "2013-10-05T14:48:00.000Z", user_id:1},
                {name:"Super Party 4",location: "daheim",startdate: "2013-10-05T14:48:00.000Z", user_id:2},
                {name:"Super Party 5",location: "daheim",startdate: "2013-10-05T14:48:00.000Z", user_id:1},
                {name:"Super Party 6",location: "daheim",startdate: "2013-10-05T14:48:00.000Z", user_id:1}
            ].forEach((value)=>{
                models.Party.create(value);
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