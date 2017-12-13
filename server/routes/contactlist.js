const express = require('express');
const router = express.Router();
const util = require('../auth/utilities');

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
                console.log(val);
                delete val.User.dataValues.password;
                delete val.User.dataValues.createdAt;
                delete val.User.dataValues.updatedAt;
                delete val.User.dataValues.deletedAt;
                ret.contacts.push(val.User.dataValues);
            });
        }
        res.status(200);
        res.json(ret);
    }).catch(err => {
        console.error(err);
        next(err)
    });
});

router.delete('/', (req, res, next) => {

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
                        },{
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
                        },{
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
        console.error(err);
        next(err)
    });
});
module.exports = router;