const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');

/*  */
router.get('/', (req, res, next) => {
    req.models.Guestlist.findAll({where: {user_id: req.userid}}).then((result) => {
        let array = [];
        result.forEach((key) => {
            array.push(key.dataValues);
        });
        res.status(200);
        res.json({einladungen: array});
    }).catch(err => next(err));
});

/* GET parties listing. */
router.post('/', (req, res, next) => {
    if (util.hasKey(req.body, 'partyid') && util.hasKey(req.body, 'userid')) {
        req.models.Guestlist.find({where: {party_id: req.body.partyid, user_id: req.body.userid}}).then(result => {
            if (result) {
                next({status: 400, message: "Der User ist bereits zu der PArty eingeladen!"});
            } else {
                req.models.Guestlist.create({party_id: req.body.partyid, user_id: req.body.userid})
                    .then(result => {
                        if (result) {
                            res.status(203);
                            res.json({message: "User wurde eingeladen!"});
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

router.put('/', (req, res, next) => {
    if (util.hasKey(req.body, 'partyid') && util.hasKey(req.body, 'userid') && util.hasKey(req.body, 'status')) {
        req.models.Guestlist.find({where: {party_id: req.body.partyid, user_id: req.body.userid}}).then(result => {
            if (result) {
                result.status = req.body.status;
                result.save()
                    .then(result => {res.status: 200,
                        res.json = {
                            message: "Es wurde der status der einladung erfolgreich abgeändert!"
                        }})
                    .catch(err => next(err));
            } else {
                next({status: 400, message: "es wurde keine Einladung gefunden von dem User zu der Party!"})
            }
        }).catch(err => {
            next(err);
        });
    } else {
        next({
            status: 400,
            message: 'Es wurde einer der bnötigten Parameter nicht mit übergeben! partyid, userid, status'
        });
    }
});

router.delete('/', (req, res, next) => {
    if (req.body.id) {
        req.models.Guestlist.destroy({where: {id: req.body.id}}).then(value => {
            if (value) {
                res.status(200);
                res.json(value);
            } else {
                next({status: 400, message: undefined});
            }
        }).catch(err => next(err));
    }
});

module.exports = router;