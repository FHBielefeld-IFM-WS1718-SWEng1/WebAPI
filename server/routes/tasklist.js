const express = require('express');
const router = express.Router();
const util = require('../auth/utilities');


router.post('/', (req, res, next) => {
    req.models.create({
        user_id: req.body.user_id,
        party_id: req.body.party_id,
        text: req.body.text,
        status: req.body.status
    }).then(value => {
        if (value) {
            res.status(200);
            res.json(value);
        } else {
            next({status: 400, message: "Kein Datensatz wurde angelegt"});
        }
    }).catch(err => next(err));
});

router.delete('/', (req, res, next) => {
    req.models.Task.destroy({where: {userid: req.body.id}}).then(value => {
        if (value) {
            res.status(200);
            res.json(value);
        } else {
            next({status: 400, message: "Mir egal was ihr macht das funktioniert nicht!"});
        }
    }).catch(err => next(err));
});

module.exports = router;