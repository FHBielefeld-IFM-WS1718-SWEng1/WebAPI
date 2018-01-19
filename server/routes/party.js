const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');
/* POST parties listing. */
router.post('/', function (req, res, next) {
    if (util.hasKey(req.body, "name") &&
        util.hasKey(req.body, "startDate") &&
        util.hasKey(req.body, "location")) {

        let entry = {};

        entry.name = req.body.name;
        entry.startDate = req.body.startDate;
        entry.location = req.body.location;
        entry.user_id = req.userid;
        entry.description = req.description;

        req.models.Party.create(entry)
            .then(result => {
                res.status(201);
                res.json(result);
            })
            .catch(err => next(err));
    } else {
        next({status: 400, message: "Das übergebene Element ist für diesen Request ungültig!"});
    }
});


/*
    Hier sollen alle Parties angezeigt werden die entweder von User erstellt wurden oder wo er als Gast eingeladen wurde.
*/
router.get('/', function (req, res, next) {
    // nach überlegungen wäre es vielleicht besser wenn das Frontend einfach auch den User mit angibt ... dennoch war in der besprechung gesagt worden, dass das Frontend einfach nur den APIKey schmeist
    // somit müssen wir den User finden dem der APIKey gehört
    let creator = true;
    let guest = true;
    console.log(req.query);
    if (util.hasKey(req.query, 'creator')) {
        creator = req.query.creator === 'true';
    }
    if (util.hasKey(req.query, 'guest')) {
        guest = req.query.guest === 'true';
    }
    if (creator === false && guest === false) {
        res.status(200);
        res.json({});
    } else {
        let includes = [];
        if (creator === true) {
            includes.push(req.models.Party);
        }
        if (guest === true) {
            includes.push({
                model: req.models.Guestlist, include: [
                    req.models.Party
                ]
            });
        }
        req.models.User.findById(req.userid, {
            include: includes
        }).then((user) => {
            let parties = [];
            if (creator === true) {
                user.Parties.forEach((value, key) => {
                    value.dataValues.ersteller = true;
                    parties.push(value.dataValues);
                });
            }
            if (guest === true) {
                user.Guestlists.forEach((value) => {
                    value.dataValues.Party.ersteller = false;
                    parties.push(value.dataValues.Party);
                });
            }

            res.status(200);
            res.json({count: parties.length, parties: parties});

        }).catch((err) => next(err));
    }
});

/* GET parties listing. */
router.get('/:id', function (req, res, next) {
    if ("id" in req.params && req.params.id) {
        if (typeof req.params.id === 'number') {
            next();
        }
        req.models.Party.findById(req.params.id, {
            include: [{
                model: req.models.Task,
                include: req.models.User
            }, {model: req.models.Todolistitem}, {
                model: req.models.Guestlist,
                include: req.models.User
            }, {model: req.models.User}, {
                model: req.models.Rating,
                include: req.models.User
            }, {
                model: req.models.Comment,
                include: req.models.Answer
            }, {
                model: req.models.Voting,
                include: {
                    model: req.models.Choice,
                    include: {
                        model: req.models.UserChoice,
                        include: req.models.User
                    }
                }
            }]
        })
            .then((result) => {
                if (result) {
                    let retval = {};
                    retval.id = result.id;
                    retval.name = result.name;
                    retval.description = result.description;
                    retval.startDate = result.startDate;
                    retval.endDate = result.endDate;
                    retval.ersteller = result.User;
                    retval.location = result.location;
                    retval.pictrue = result.picture;
                    util.removeKeysFromUser(retval.ersteller);
                    retval.tasks = [];
                    result.Tasks.forEach((value) => {
                        util.removeTimeStamp(value.dataValues);
                        util.removeKeysFromUser(value.dataValues.User.dataValues);
                        retval.tasks.push(value.dataValues);
                    });
                    retval.todo = [];
                    result.Todolistitems.forEach((value) => {
                        util.removeTimeStamp(value.dataValues);
                        retval.todo.push(value.dataValues);
                    });
                    util.removeTimeStamp(retval);
                    retval.guests = [];
                    result.Guestlists.forEach((value) => {
                        util.removeTimeStamp(value.dataValues);
                        retval.guests.push(value.dataValues);
                    });
                    retval.ratings = [];
                    retval.ratingAverage = 0;
                    result.Ratings.forEach((value) => {
                        util.removeTimeStamp(value.dataValues);
                        util.removeKeysFromUser(value.User.dataValues);
                        retval.ratings.push(value.dataValues);
                        ratingAverage += value.dataValues.value;
                    });
                    retval.ratingAverage /= retval.ratings.length;
                    result.comments = [];
                    result.Comments.forEach((value) => {
                        util.removeTimeStamp(value.dataValues);
                        util.removeKeysFromUser(value.User.dataValues);
                        retval.comments.push(value.dataValues);
                    });
                    retval.votings = [];
                    result.Votings.forEach((value) => {
                        let vote = {};
                        vote.id = value.id;
                        vote.name = value.name;
                        vote.choices = [];
                        if (util.hasKey(value, 'Choices')) {
                            value.Choices.forEach(value => {
                                let choice = {};
                                choice.id = value.id;
                                choice.text = value.text;
                                choice.userChoices = [];
                                choice.votes = 0;
                                if (util.hasKey(value, 'UserChoices')) {
                                    console.log(value);
                                    value.UserChoices.forEach(value => {
                                        choice.votes++;
                                        let userChoice = {};
                                        userChoice.id = value.id;
                                        userChoice.user = {};
                                        userChoice.user.id = value.User.id;
                                        userChoice.user.email = value.User.email;
                                        userChoice.user.name = value.User.name;
                                        choice.userChoices.push(userChoice);
                                    });
                                }
                                vote.choices.push(choice);
                            });
                        }
                        retval.votings.push(vote);
                    });


                    res.status(200);
                    res.json(retval);
                } else {
                    next({status: 400, message: "Keine Partie mit der id " + req.params.id})
                }
            }).catch(err => next(err));
    } else {
        next({status: 400, message: "Keine gültige ID wurde übergeben!"});
    }
});

/* PUT parties listing. */
router.put('/:id', function (req, res, next) {
    if (util.hasKey(req.params, "id")) {
        req.models.Party.findById(req.params.id)
            .then(result => {
                if (result) {
                    util.changeValueIfExists(result, req.body, "name");
                    util.changeValueIfExists(result, req.body, "description");
                    util.changeValueIfExists(result, req.body, "startDate");
                    util.changeValueIfExists(result, req.body, "endDate");
                    util.changeValueIfExists(result, req.body, "location");
                    result.save().then(result => {
                        res.status(200);
                        res.json(result)
                    }).catch(err => next(err));
                } else {
                    next({status: 400, message: "Kein element mit dieser id gefunden!"});
                }
            })
            .catch(err => next(err));

    } else {
        next({status: 400, message: "Keine id übergeben"});
    }
});


/* DELETE parties listing. */
router.delete('/:id', function (req, res, next) {
    if ("id" in req.params && req.params.id) {
        var id = req.params.id;
        req.models.Party.destroy({where: {id: id}}).then(result => {
            res.status(200);
            res.json({message: "erfolgreich", deletedItems: result});
        }).catch(err => {
            next(err);
        })
    } else {
        next({status: 400, message: "Keine id übergeben."});
    }
});
module.exports = router;