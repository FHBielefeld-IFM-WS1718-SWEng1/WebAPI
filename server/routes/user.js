const express = require('express');
const router = express.Router();

// Tempörere Lösung anstelle von der Datenbank!
var temp = {name: "Liste aller User", values: []};
var highestID = 0;

// POST
router.post('/', function (req, res, next) {
    if ("name" in req.body && "description" in req.body && req.body.name && req.body.description) {
        var entry = {};
        entry.id = highestID++;
        entry.name = req.body.name;
        entry.description = req.body.description;
        temp.values.push(entry);

        req.models.user.create({name: req.body.name, description: req.body.description}, function (err, results) {
            if (err) throw err;
            console.log(results);
            if (!results) {
                res.json(results);
                res.code = 201;
            }
        });


        // res.json(entry);
    } else {
        res.json({error: 400, text: "Das übergebene Element ist für diesen Request ungültig!"});
    }
});

/* GET user listing. */
router.get('/:id', function (req, res, next) {
        if ("id" in req.params && req.params.id) {
            var id = req.params.id;
            req.models.user.find({id: id}, function (err, people) {
                if (err) throw err;
                if (!people)
                    console.log("People found: %d", people.length);
                console.log("First person: %s, age %d", people[0].fullName(), people[0].age);

                if (!erfolg) {
                    res.status = 404
                    res.json({error: "Keine Partie mit der id " + id});
                }
            });
        }
        else {
            res.status(404);
            res.json({id: "missing", name: "get"});
        }
    }
);

/* PUT user listing. */
router.put('/:id', function (req, res, next) {
    if ("id" in req.params && req.params.id) {
        var id = req.params.id;
        var i;
        var erfolg;
        for (i = 0; i < temp.values.length; i++) {
            if (temp.values[i].id == id) {
                if ("name" in req.body && req.body.name) {
                    temp.values[i].name = req.body.name;
                }
                if ("description" in req.body && req.body.description) {
                    temp.values[i].description = req.body.description;
                }
                if ("invited" in req.body && req.body.invited) {
                    temp.values[i].invited = req.body.invited || [];
                }
                res.status = 200
                res.json(temp.values[i]);
                erfolg = true;
            }
        }
        if (!erfolg) {
            res.json({error: 404, name: "Kein User mit der id " + id});
        }
    } else {
        res.json({id: "missing", name: "get"});
    }
});


/* DELETE user listing. */
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