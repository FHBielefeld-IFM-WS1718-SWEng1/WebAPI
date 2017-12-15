const express = require('express');
const router = express.Router();
const util = require('../auth/utilities');

// Tempörere Lösung anstelle von der Datenbank!
var temp = {name: "Liste aller User", values: []};

/* PUT user listing. */
router.put('/:id', function (req, res, next) {
    if (util.hasKey(req.params,"id")) {
        var id = req.params.id;
        req.models.User.findById(id)
            .then(result => {
                if(result){
                    util.changeValueIfExists(result,req.body,"name");
                    if(req.body.gender >= 0 && req.body.gender <=3){
                        util.changeValueIfExists(result,req.body, "gender");
                    }
                    util.changeValueIfExists(result,req.body, "birthdate");
                    result.save().then(result =>{
                        res.status(200);
                        res.json(result);
                    }).catch(err=> next(err));
                }
                else {
                    next({status:400,message:"Kein Element mit dieser ID gefunden.!"});
                }
            })
            .catch(err => next(err));
    } else {
        next({status:400, id: "missing", name: "id"});
    }
});


/* DELETE user listing. */
router.delete('/:id', function (req, res, next) {
    if ("id" in req.params && req.params.id) {


        var id = req.params.id;
        req.models.User.destroy({where: {id: id}}).then(result => {
            res.status(200);
            res.json({message:"erfolg", deletedItems:result});

        }).catch(err => {
            res.status(400);
            res.json(err)
        })
    } else {
        res.json({id: "missing", name: "get"});
    }
});

/* GET user listing. Mit aenderung, zurückgegeben wird nur name email und id
 *  zurück gegeben werden alle User
 */
router.get('/', function (req, res, next) {
    res.status(200);
    res.json();
});
module.exports = router;