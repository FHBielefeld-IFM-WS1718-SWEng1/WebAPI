const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');

router.post('/', (req, res, next) => {
    if (util.hasKey(req.body, 'userid')) {
        req.models.Contactlist.create({user_id1: req.userid, user_id2: req.body.userid, status: 0}).then((result) => {
            res.status(203);
            res.json(result);
        }).catch(err => next(err));
    } else {
        next({status: 400, message: "Kein Gültiger request userid erwartet!"});
    }
});

router.get('/', (req, res, next) => {
    req.models.Contactlist.findAll({
        where:
            {
                $or: [
                    {
                        user_id1:
                            {
                                $eq: req.userid
                            }
                    },
                    {
                        user_id2:
                            {
                                $eq: req.userid
                            }
                    }]
            },
        include: {
            model: req.models.User
        }
    }).then((result) => {
        let ret = {count: 0, contacts: []};
        if (result) {

            result.forEach(val => {
                delete val.User.dataValues.password;
                delete val.User.dataValues.createdAt;
                delete val.User.dataValues.updatedAt;
                delete val.User.dataValues.deletedAt;
                ret.contacts.push(val.User.dataValues);
            });
        }
        res.status(200);
        ret.count = ret.contacts.length;
        res.json(ret);
    }).catch(err => {
        next(err)
    });
});

router.put('/', (req, res, next) => {
    if (util.hasKey(req.body, 'userid')) {
        req.models.Contactlist.find({
            where: {
                $or: [
                    {
                        $and: [{
                            user_id1:
                                {
                                    $eq: req.userid
                                }
                        }, {
                            user_id2:
                                {
                                    $eq: req.body.userid
                                }
                        }]
                    },
                    {
                        $and: [{
                            user_id1:
                                {
                                    $eq: req.body.userid
                                }
                        }, {
                            user_id2:
                                {
                                    $eq: req.userid
                                }
                        }]
                    }
                ]
            }
        }).then(result => {
            if (result) {
                util.changeValueIfExists(result, req.body, 'status');
                result.save().then((res2) => {
                    res.status(200);
                    res.json({message: "erfolg"});
                }).catch(err => next(err));
            } else {
                next({status: 400, message: "Kein eintrag mit dieser ID!"});
            }
        }).catch(err => next(err));
    } else {
        next({status: 400, message: "Keine userid übergeben!"})
    }

});

router.delete('/', (req, res, next) => {
    if (util.hasKey(req.body, 'userid')) {


        req.models.Contactlist.destroy({
            where:
                {
                    $or: [
                        {
                            $and: [{
                                user_id1:
                                    {
                                        $eq: req.userid
                                    }
                            }, {
                                user_id2:
                                    {
                                        $eq: req.body.id
                                    }
                            }]
                        },
                        {
                            $and: [{
                                user_id1:
                                    {
                                        $eq: req.body.userid
                                    }
                            }, {
                                user_id2:
                                    {
                                        $eq: req.userid
                                    }
                            }]
                        }
                    ]
                },
            include: {
                model: req.models.User
            }
        }).then((result) => {
            res.status(200);
            res.json({message: "erfolg", items: result});
        }).catch(err => {
            next(err)
        });
    } else {
        next({status: 400, message: "Es wird eine Id beim request benötigt!"})
    }
});

module.exports = router;