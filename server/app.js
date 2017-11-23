const express = require('express');   // Die express komponente ermöglicht einfaches erstellen von Routen
//var logger = require('morgan');     // Logger für Requests
const bodyParser = require('body-parser');    // erstellt aus dem Request ein Javascript Object
const checkToken = require('./auth/authenticate');
const orm = require("orm");
// alle routen importieren
const parties = require('./routes/parties');  // Das erste Routen Module
const users = require('./routes/user');

// Globale Variablen
// Tempörär hier gehostet
var config = require('../databaseconfig.json');

const app = express();                // erstellen einer Express Node.js Application

//app.use(logger('dev'));                                 //  Einstellen des Loggers
app.use(orm.express(config.connectionString, { // erstellen der Modelle der DB
    define: function (db, models, next) {       // nächster schritt die Restrictions hinzufügen!!!
        models.user = db.define("User", {
            Userid: {type: "integer", unique: true},
            Name: {type: "text", size: 20},
            Email: {type: "text", size: 50},
            Password: {type: "text", size: 50},
            Birthdate: {type: "text", size: 5},
            Gender: {type: "text", size: 50},
            Address: {type: "text", size: 50},
            Profilepicture: {type: "text", size: 100},
            CreatedAt: {type: "date", time: true},
            ChangedAt: {type: "date", time: true},
            DeletedAt: {type: "date", time: true}
        });
        next();
    }
}));
app.use(bodyParser.json());                             //
app.use(bodyParser.urlencoded({extended: false}));      //

// Hier werden die Routen eingetragten die public sind
app.use('/users', users);
app.use(function (req, res, next) {
    if (req.query.api && checkToken(req.query.api)) {
        next();
    } else {
        var err = new Error('API Key ungültig!');
        err.status = 403;
        next(err)

    }
});
// Hier werden die Routen eingetragen die Login erfordern
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

    console.log('API listening on ' + listener.address().port);
});


module.exports = listener;