var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var parties = require('./routes/parties');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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

var listener = app.listen(8080, function () {
    console.log('API listening on ' + listener.address().port);
});