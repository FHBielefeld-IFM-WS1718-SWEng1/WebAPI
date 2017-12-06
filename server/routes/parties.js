const express = require('express');
const router = express.Router();
const util = require('../auth/utilities');
/* POST parties listing. */
// TODO Route zum anlegen neuer einträge entwickeln
router.post('/', function (req, res, next) {
    if (util.hasKey(req.body, "name") &&
        util.hasKey(req.body, "startdate") &&
        util.hasKey(req.body, "location")) {

        let entry = {};

        entry.name = req.body.name;
        entry.startdate = req.body.startdate;
        entry.location = req.body.location;
        entry.user_id = req.user_id;

        req.models.Party.create(entry)
            .then(result => {
                res.status(201);
                res.json(result);
            })
            .catch(err => next(err));
    } else {
        next({status: 400, message: "Das übergebene Element ist für diesen Request ungültig!"});
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
        req.models.Party.findById(req.params.id)
            .then((result) => {
                if (result) {
                    res.status(200);
                    res.json(result);
                } else {
                    next({status: 400, message: "Keine Partie mit der id " + req.params.id})
                }
            }).catch(err => next(err));
    } else {
        next({status: 400, message: "Keine gültige ID wurde übergeben!"});
    }
});

/* PUT parties listing. */
// TODO Route zum abändern
router.put('/:id', function (req, res, next) {
    if (util.hasKey(req.params, "id")) {
        req.models.Party.findById(req.params.id)
            .then(result => {
                if (result) {
                    util.changeValueIfExists(result, req.body, "name");
                    util.changeValueIfExists(result, req.body, "description");
                    util.changeValueIfExists(result, req.body, "startDate");
                    util.changeValueIfExists(result, req.body, "endDate");
                    util.changeValueIfExists(result, req.body, "location");
                    result.save().then(result => {
                        res.status(200);
                        res.json(result)
                    }).catch(err => next(err));
                } else {
                    next({status: 400, message: "Kein element mit dieser id gefunden!"});
                }
            })
            .catch(err => next(err));

    } else {
        next({status: 400, message: "Keine id übergeben"});
    }
});


/* DELETE parties listing. */
router.delete('/:id', function (req, res, next) {
    if ("id" in req.params && req.params.id) {
        var id = req.params.id;
        req.models.Party.destroy({where: {id: id}}).then(result => {
            res.status(200);
            res.json({message: "erfolgreich", deletedItems: result});
        }).catch(err => {
            next(err);
        })
    } else {
        next({status: 400, message: "Keine id übergeben."});
    }
});
module.exports = router;