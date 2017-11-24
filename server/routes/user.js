const express = require('express');
const router = express.Router();

// Tempörere Lösung anstelle von der Datenbank!
var temp = {name: "Liste aller User", values: []};


// POST
router.post('/', function (req, res, next) {
    if ("email" in req.body && "name" in req.body && "password" in req.body) {
        var currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        req.models.user.create({
            Name: req.body.name,
            Password: req.body.password,
            Email: req.body.email,
            CreatedAt: currentDate,
            ChangedAt: currentDate
        }, function (err, results) {
            if (err) throw err;
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
            req.models.user.find({Userid: id, DeletedAt: null}, function (err, user) {
                if (err) throw err;
                if (user && user.length > 0 && user[0]) {
                    res.json(user[0]);
                    return;
                }
            });
            throw {message: "", error: "UseLess"};
            
        } else {
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