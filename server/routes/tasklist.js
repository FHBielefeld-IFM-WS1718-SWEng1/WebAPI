const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');


router.post('/', (req, res, next) => {
    req.models.Task.create({
        user_id: req.body.user_id,
        party_id: req.body.party_id,
        text: req.body.text,
        status: req.body.status
    }).then(value => {
        if (value) {
            req.models.User.findById(req.body.user_id).then(value2 => {
                res.status(200);
                let model = value.dataValues;
                model.user = {};
                model.user.id = value2.id;
                model.user.name = value2.name;
                res.json(model);
            }).catch(err => {
                next(err)
            });
        } else {
            next({status: 400, message: "Kein Datensatz wurde angelegt"});
        }
    }).catch(err => next(err));
});

router.put('/', (req, res, next) => {
    req.models.Task.findById(req.body.id)
        .then(value => {
            util.changeValueIfExists(value, req.body, 'text');
            util.changeValueIfExists(value, req.body, 'status');
            value.save().then(value2 => {
                if (value2) {
                    res.status(200);
                    res.json(value2);
                } else {
                    next({status: 400, message: "Keine Änderungen in der DB"});
                }
            }).catch(err => next(err));
        }).catch(err => next(err));
});

router.delete('/', (req, res, next) => {
    req.models.Task.destroy({where: {user_id: req.body.id}}).then(value => {
        if (value) {
            res.status(200);
            res.json(value);
        } else {
            next({status: 400, message: "Mir egal was ihr macht das funktioniert nicht!"});
        }
    }).catch(err => next(err));
});

module.exports = router;