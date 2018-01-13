const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');

router.post('/', (req, res, next) => {
    if (util.hasKey(req.body, 'partyid') && util.hasKey(req.body, 'rating')) {
        req.models.Rating.find({where: {party_id: req.body.partyid, user_id: req.userid}}).then(result => {
            if (result) {
                next({
                    status: 400,
                    message: "Aus den Pflichten heft geht nicht heraus ob der User mehrmals Voten darf/ seinen Vote ändern darf"
                });
            } else {
                // Kein Rating mit dem User zu der Party
                req.models.Rating.create({
                    party_id: req.body.partyid,
                    user_id: req.userid,
                    value: req.body.rating
                }).then(result => {
                    res.status(203);
                    res.json(result);
                }).catch(err => next(err));
            }
        }).catch(err => next(err));
    }
});

module.exports = router;