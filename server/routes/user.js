const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');

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
//TODO datum setzen wie bei register
router.delete('/:id', function (req, res, next) {
    if (util.hasKey(req.params,"id")) {
        var id = req.params.id;
        req.models.User.findById(id)
            .then(result => {
                if(result){
                    //hier wird der User gelöscht, nur nicht mit destroy
                        req.models.APIKey.findOne({where:{id : id}}).then(key=>{
                            key.destroy();
                        });
                        result.destroy().then((r)=>{
                            result.save().then(result =>{
                                res.status(200);
                                res.json({message:"Erfolg"});
                            }).catch(err=> next(err));
                        }).catch(err=>next(err));
                }
                else {
                    next({status:400,message:"Kein Element mit dieser ID gefunden!"});
                }
            })
            .catch(err => next(err));
    } else {
        next({status:400,message:"Keine ID vorhanden!"});
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
                erg.values[i] = {name: temp.dataValues.name, email: temp.dataValues.email, id: temp.dataValues.id};
            }
            res.json(erg);
            res.status(200);
        }
    }).catch(err => next(err));
});
module.exports = router;