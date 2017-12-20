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


/* DELETE user listing. Nikita*/
router.delete('/:id', function (req, res, next) {
    if (util.hasKey(req.params,"id")) {
        var id = req.params.id;
        req.models.User.findById(id).then((result) =>{
            if(result) {
                util.changeValueIfExists(result.dataValues, {deletedAt:new Date()}, "deletedAt");
                result.save().then(erg =>{
                    res.status(200);
                    console.log(result.dataValues)
                    res.json(result);
                }).catch(err=> next(err));
            }else{
                next({status:400,message:"Kein Element mit dieser ID gefunden.!"});
            }
        }).catch(err => next(err));
    } else {
        res.json({id: "missing", name: "id"});
    }
});

/* GET user listing. Mit aenderung, zurückgegeben wird nur name email und id
 *  zurück gegeben werden alle User
 */
router.get('/', function (req, res, next) {
    var erg = {values:[]};
    req.models.User.findAll().then((result)=>{
        if(result){
            var temp;
            for(var i =0;i <= result.length+1;i++){
                temp= result.pop();
                if(temp.dataValues.deletedAt == null) {
                    erg.values[i] = temp;
                    //erg.values[i] = {name: temp.dataValues.name, email: temp.dataValues.email, id: temp.dataValues.id};
                }
            }
            res.json(erg);
            res.status(200);
        }
    }).catch(err => next(err));
});
module.exports = router;