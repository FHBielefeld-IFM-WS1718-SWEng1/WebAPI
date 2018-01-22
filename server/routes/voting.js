const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');

/*  */
router.post('/', (req, res, next) => {
    if (util.hasKey(req.body, 'name') && util.hasKey(req.body, 'party_id')) {
        let elem = {name: req.body.name, user_id: req.userid, party_id: req.body.party_id};
        req.models.Voting.create(elem).then((result) => {
            res.status(203);
            res.json(result);
        }).catch(err => next(err));
    } else {
        next({status: 400, message: "Ein gültiger Request brauch abstimmungsname und party_id"});
    }
});

router.post('/choice', (req, res, next) => {
    if (util.hasKey(req.body, 'text') && util.hasKey(req.body, 'voting_id')) {
        let elem = {text: req.body.text, voting_id: req.body.voting_id};
        req.models.Choice.create(elem).then((result) => {
            res.status(203);
            res.json(result);
        }).catch(err => next(err));
    } else {
        next({status: 400, message: "Ein gültiger Request brauch abstimmungsname und party_id"});
    }
});

router.post('/choice/vote', (req, res, next) => {
    if (util.hasKey(req.body, 'choice_id')) {
        let elem = {choice_id: req.body.choice_id, user_id: req.userid};
        req.models.Choice.create(elem).then((result) => {
            res.status(203);
            res.json(result);
        }).catch(err => next(err));
    } else {
        next({status: 400, message: "Ein gültiger Request brauch abstimmungsname und party_id"});
    }
});


module.exports = router;