const express = require('express');
const router = express.Router();

// Tempörere Lösung anstelle von der Datenbank!
var temp = {name: "Liste aller User", values: []};


// POST
router.post('/', function (req, res, next) {
    if ("email" in req.body && "name" in req.body && "password" in req.body) {
        req.models.User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        }).then((results) => {
            if (results) {
                delete results.dataValues['password'];
                res.json(results.dataValues);
            }
        }).catch(error => {
            console.log(error);
        });
    } else {
        res.json({error: 400, text: "Das übergebene Element ist für diesen Request ungültig!"});
    }
});

/* GET user listing. */
router.get('/:id', function (req, res, next) {
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

/* PUT user listing. */
router.put('/:id', function (req, res, next) {
    if ("id" in req.params && req.params.id) {
        var id = req.params.id;
        // nein dies ist nicht die entgültige Form des Put Requests
        req.models.User.update(req.body, {where: {id: id}}).then(result => {
            req.models.User.findById(id).then((result) => {
                res.status(200);
                delete result.dataValues.password;
                res.json(result);
            }).catch((err) => {
                res.status(400);
                res.json(err)
            });
        }).catch(err => {
            res.status(400);
            res.json(err);
        });
    } else {
        res.json({id: "missing", name: "get"});
    }
});


/* DELETE user listing. */
router.delete('/:id', function (req, res, next) {
    if ("id" in req.params && req.params.id) {


        var id = req.params.id;
        req.models.User.destroy({where: {id: id}}).then(result => {
            res.status(200);
            res.json({message:"erfolg", deletedItems:result});

        }).catch(err => {
            res.status(400);
            res.json(err)
        })
    } else {
        res.json({id: "missing", name: "get"});
    }
});

module.exports = router;