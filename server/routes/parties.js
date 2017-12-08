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
        entry.user_id = req.userid;

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
    console.log("Partie PArtie");
    var array = [];
    req.models.User.findById(req.userid, {
        include: [
            {
                model: req.models.Party
            },
            'eingeladenuser'

        ]
    }).then((user) => {
//        console.log(user);
        let partys = [];
        user.Parties.forEach((value, key) => {
            console.log(key + " ; " + value);
            partys.push(value.dataValues)
        });
        res.status(200);
        res.json({count: partys.length, partys: partys});

    }).catch((err) => next(err));
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