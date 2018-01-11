const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');

// Tempörere Lösung anstelle von der Datenbank!
var temp = {name: "Liste aller User", values: []};

/* PUT user listing. */
router.put('/:id', function (req, res, next) {
    if (util.hasKey(req.params, "id")) {
        var id = req.params.id;
        req.models.User.findById(id)
            .then(result => {
                if (result) {
                    util.changeValueIfExists(result, req.body, "name");
                    if (req.body.gender >= 0 && req.body.gender <= 3) {
                        util.changeValueIfExists(result, req.body, "gender");
                    }
                    util.changeValueIfExists(result, req.body, "birthdate");
                    result.save().then(result => {
                        res.status(200);
                        res.json(result);
                    }).catch(err => next(err));
                }
                else {
                    next({status: 400, message: "Kein Element mit dieser ID gefunden.!"});
                }
            })
            .catch(err => next(err));
    } else {
        next({status: 400, id: "missing", name: "id"});
    }
});

/* GET user listing. */
-router.get('/:id', function (req, res, next) {
        if ("id" in req.params && req.params.id) {
            var id = req.params.id;
            req.models.User.findById(id)
                .then((user) => {
                    if (user) {
                        delete user.dataValues.password;
                        res.status(200);
                        res.json(user);
                    } else {
                        res.status(400);
                        res.json({error: "Kein User mit der ID " + id});
                    }
                }).catch((error) => {
                    next(error);
                }
            );
        } else {
            res.status(404);
            res.json({id: "missing", name: "get"});
        }
    }
);

/* DELETE user listing. Nikita*/
//TODO datum setzen wie bei register
router.delete('/:id', function (req, res, next) {
    if (util.hasKey(req.params, "id")) {
        var id = req.params.id;
        req.models.User.findById(id)
            .then(result => {
                if (result) {
                    //hier wird der User gelöscht, nur nicht mit destroy
                    req.models.APIKey.findOne({where: {id: id}}).then(key => {
                        key.destroy();
                    });
                    result.destroy().then((r) => {
                        result.save().then(result => {
                            res.status(200);
                            res.json({message: "Erfolg"});
                        }).catch(err => next(err));
                    }).catch(err => next(err));
                }
                else {
                    next({status: 400, message: "Kein Element mit dieser ID gefunden!"});
                }
            })
            .catch(err => next(err));
    } else {
        next({status: 400, message: "Keine ID vorhanden!"});
    }
});

/* GET user listing. Mit aenderung, zurückgegeben wird nur name email und id
 *  zurück gegeben werden alle User
 */
router.get('/', function (req, res, next) {
    var erg = {values: []};
    req.models.User.findAll().then((result) => {
        if (result) {
            result.forEach((user) => {
                erg.values.push({name: user.name, email: user.email, id: user.id});
            });

            res.json(erg);
            res.status(200);
        }
    }).catch(err => next(err));
});
module.exports = router;