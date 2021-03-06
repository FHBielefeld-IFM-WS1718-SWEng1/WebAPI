var express = require('express');
var router = express.Router();
var crypt = require("../helper/crypt");

router.post('/', function (req, res, next) {
    if ("email" in req.body && "name" in req.body && "password" in req.body) {
        req.models.User.create({
            name: req.body.name,
            password: crypt.enc(req.body.password),
            email: req.body.email
        }).then((results) => {
            if (results) {
                delete results.dataValues['password'];
                res.json(results.dataValues);
            }
        }).catch(error => {
            next({status: 400, message: error.errors[0].message})
        });
    } else {
        next({status: 400, message: "Das übergebene Element ist für diesen Request ungültig!"});
    }
});

module.exports = router;