const express = require('express');
const router = express.Router();
const crypt = require('../helper/crypt');

router.post('/', function (req, res, next) {
    if ('password' in req.body && 'email' in req.body) {
        req.models.User.findAll({where: {email: req.body.email}}).then(function (ergebnisse) {
            if (ergebnisse[0] && ergebnisse[0].password == crypt.enc(req.body.password)) {
                var userObjekt = ergebnisse[0].dataValues;
                var hash = crypt.encurl(userObjekt.email + "," + new Date().toLocaleString());
                req.models.APIKey.create({user_id: userObjekt.id, apiKey: hash}).then((result) => {
                    userObjekt.key = hash;
                    delete userObjekt.password;
                    res.status(200);
                    res.json(userObjekt);
                }).catch((err) => {
                    next(err);
                });
            } else {
                next({status: 400, message: "Kein gültiger Request!"});
            }
        })
    } else {
        next({status: 400, message: "Kein gültiger Request!"});
    }
});
module.exports = router;