var express = require('express');   // Die express komponente ermöglicht einfaches erstellen von Routen
//var logger = require('morgan');     // Logger für Requests
var bodyParser = require('body-parser');    // erstellt aus dem Request ein Javascript Object

// alle routen
var parties = require('./routes/parties');  // Das erste Routen Module

var app = express();                // erstellen einer Express Node.js Application

//app.use(logger('dev'));                                 //  Einstellen des Loggers
app.use(bodyParser.json());                             //
app.use(bodyParser.urlencoded({extended: false}));      //
// Hier werden die Routen eingetragen
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