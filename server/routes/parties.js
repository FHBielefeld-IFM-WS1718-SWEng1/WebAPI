var express = require('express');
var router = express.Router();
// TODO entwickeln von Route ohne Javascript objekt sondern auf den Stand der DB
// TODO wird angefangen =)
var temp = {name: "Liste aller Partys.", values: []};
var highestID = 0;

/* POST parties listing. */
// TODO Route zum anlegen neuer einträge entwickeln
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


/*
    Hier sollen alle Parties angezeigt werden die entweder von User erstellt wurden oder wo er als Gast eingeladen wurde.
*/
// TODO Route zum anzeigen aller Parties an welche der User teilnimmt
router.get('/', function (req, res, next) {
    // nach überlegungen wäre es vielleicht besser wenn das Frontend einfach auch den User mit angibt ... dennoch war in der besprechung gesagt worden, dass das Frontend einfach nur den APIKey schmeist
    // somit müssen wir den User finden dem der APIKey gehört
    if ('api' in req.query && req.query.api) {
        // kontrolle ob der API-Key gültig ist
        // Außerdem wird so die User_ID gefunden
        req.models.APIKey.findAll({
            include: [{model: req.models.User}],
            where: {apiKey: req.query.api}
        }).then((results) => {
            if (results.length === 1) {
                var array = [];
                req.models.User.findAll({
                    where: {id: results[0].user_id}
                }).then((user) => {
                });
                // durchsuchen aller Partys wo der User Gast ist
                req.models.Guestlist.findAll({where: {user_id: results[0].user_id}}).then((resultsGuest) => {
                    var array2 = []
                    resultsGuest.forEach((eintrag) => array2.push(eintrag));
                    req.models.Party.findAll({
                        where: {
                            user_ID: results[0].user_id,
                            id: array2
                        }
                    }).then((resultPartysErsteller) => {
                        resultPartysErsteller.forEach((eintrag) => array.push(eintrag));
                        res.status(200);
                        res.json(array);
                    }).catch((err) => next(err));
                }).catch((err) => next(err));
            } else if (results.length > 1) {
                next({status: 400, message: 'doppelte keys vorhanden eindeutigkeit verloren bitte neuen KeyGenerieren!'});
            } else {
                next({status: 400, message: "Kein gültiger API Key verfügbar!"});
            }
        }).catch(err => next(err));
    } else {
        res.json({error: "Du scheis node"});
    }
});

/* GET parties listing. */
// TODO Route zum anzeigen einer speziellen Party an welche der User Teilnehmen kann oder mitglied ist!
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

/* PUT parties listing. */
// TODO Route zum abändern
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
                res.status = 200;
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
            if (temp.values[i].id === id) {
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