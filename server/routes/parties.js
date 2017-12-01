var express = require('express');
var router = express.Router();
var temp = {name: "Liste aller Partys.", values: []};
var highestID = 0;

/* POST parties listing. */
router.post('/', function (req, res, next) {
    if ("name" in req.body && "description" in req.body && req.body.name && req.body.description) {
        var entry = {};
        entry.id = highestID++;
        entry.name = req.body.name;
        entry.description = req.body.description;
        entry.invited = req.body.invited || [];
        temp.values.push(entry);
        res.json(entry);
    } else {
        res.json({error: 400, text: "Das übergebene Element ist für diesen Request ungültig!"});
    }
});

/* GET parties listing. */
router.get('/:id', function (req, res, next) {
    if ("id" in req.params && req.params.id) {
        var id = req.params.id;
        var i;
        var erfolg;
        for (i = 0; i < temp.values.length; i++) {
            if (temp.values[i].id == id) {
                res.json(temp.values[id]);
                erfolg = true;
            }
        }
        if (!erfolg) {
            res.status = 404
            res.json({error: "Keine Partie mit der id " + id});
        }
    } else {
        res.status(404);
        res.json({id: "missing", name: "get"});
    }
});

/* Get All Parties */
router.get('/', function (req, res, next) {
    res.json(temp);
});

/* PUT parties listing. */
router.put('/:id', function (req, res, next) {
    if ("id" in req.params && req.params.id) {
        var id = req.params.id;
        var i;
        var erfolg;
        for (i = 0; i < temp.values.length; i++) {
            if (temp.values[i].id == id) {
                if("name" in req.body && req.body.name ){
                    temp.values[i].name = req.body.name;
                }
                if("description" in req.body && req.body.description ){
                    temp.values[i].description = req.body.description;
                }
                if("invited" in req.body && req.body.invited ){
                    temp.values[i].invited = req.body.invited || [];
                }
                res.status = 200
                res.json(temp.values[i]);
                erfolg = true;
            }
        }
        if (!erfolg) {
            res.json({error: 404, name: "Keine Partie mit der id " + id});
        }
    } else {
        res.json({id: "missing", name: "get"});
    }
});



/* DELETE parties listing. */
router.delete('/:id', function (req, res, next) {
    if ("id" in req.params && req.params.id) {
        var id = req.params.id;
        var i;
        var erfolg;
        for (i = 0; i < temp.values.length; i++) {
            if (temp.values[i].id == id) {
                temp.values.splice(i, 1);
                res.json({status: "erfolg", text: "element gelöscht"});
                erfolg = true;
            }
        }
        if (!erfolg) {
            res.json({error: 404, name: "Keine Partie mit der id " + id});
        }
    } else {
        res.json({id: "missing", name: "get"});
    }
});

module.exports = router;