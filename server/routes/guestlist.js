const express = require('express');
const router = express.Router();
const util = require('../auth/utilities');

/* GET parties listing. */
// TODO Einladung abschicken
router.post('/', (req, res, next) => {
    if (util.hasKey(req.body, 'partyid') && util.hasKey(req.body, 'userid')) {
        req.models.Guestlist.find({where: {party_id: req.body.partyid, user_id: req.body.userid}}).then(result => {
            if (result) {
                next({status: 400, message: "Der User ist bereits zu der PArty eingeladen!"});
            } else {
                req.models.Guestlist.create({party_id: req.body.partyid, user_id: req.body.userid})
                    .then(result => {
                        if (result) {
                            next({status: 203, message: "User wurde eingeladen!"});
                        } else {
                            next({status: 400, message: "User wurde nicht eingeladen"});
                        }
                    }).catch(err => next(err));
            }
        }).catch(err => next(err));
    } else {
        next({status: 400, message: "Diie Parameter partyid und userid werden im Boy benötigt!"});
    }
});

// TODO Einladung bestätigen oder ablehnen!
router.put('/', (req, res, next) => {
    if (util.hasKey(req.body, 'partyid') && util.hasKey(req.body, 'userid') && util.hasKey(req.body, 'status')) {
        req.models.Guestlist.find({where: {party_id: req.body.partyid, user_id: req.body.userid}}).then(result => {
            if (result) {
                result.status = req.body.status;
                result.save()
                    .then(result => next({
                        status: 200,
                        message: "Es wurde der status der einladung erfolgreich abgeändert!"
                    }))
                    .catch(err => next(err));
            } else {
                next({status: 400, message: "es wurde keine Einladung gefunden von dem User zu der Party!"})
            }
        }).catch(err => {console.error("Party");next(err);});
    } else {
        next({
            status: 400,
            message: 'Es wurde einer der bnötigten Parameter nicht mit übergeben! partyid, userid, status'
        });
    }
});

module.exports = router;