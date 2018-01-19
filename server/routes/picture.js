const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');

router.get('/:id', function (req, res, next){
    if(util.hasKey(req.params,"id")){
        req.models.Picture.findById(req.params.id).then(picture=>{
            if(picture){
                res.status(200);
                res.json(picture);
            } else {
                next({status: 400, message: "Kein Element mit dieser ID gefunden!"});
            }
        }).catch(err=> next(err));
    } else {
        next({status: 400, message: "Keine ID vorhanden!"});
    }
});


router.put('/:id', function (req, res, next){
    if(util.hasKey(req.params,"id")){
        req.models.Picture.findById(req.params.id).then(picture=>{
            if(picture){
                util.changeValueIfExists(picture, req.body, "text");
                util.changeValueIfExists(picture, req.body, "file");
                picture.save().then(result=>{
                    res.status(200);
                    res.json(picture);
                }).catch(err => next(err));
            } else{
                next({status: 400, message: "Kein Element mit dieser ID gefunden!"});
            }
        });
    } else {
        next({status: 400, message: "Keine ID vorhanden!"});
    }
});


router.delete('/:id', function (req, res, next){
    if(util.hasKey(req.params,"id")){
        req.models.Picture.findById(req.params.id).then(picture=>{
            if(picture){
                picture.destroy().then(r=> picture.save().then(result=>{
                    res.status(200);
                    res.json({message:"Erfolg"});
                }).catch(err=>next(err))).catch(err=>next(err));
            } else {
                next({status: 400, message: "Kein Element mit dieser ID gefunden!"});
            }
        });
    } else {
        next({status: 400, message: "Keine ID vorhanden!"});
    }
});

router.post('/', function(req, res, next){
    if(util.hasKey(req.body,"user_id") && util.hasKey(req.body,"party_id")){
        req.models.Picture.create({
            text:req.body.text,
            file:req.body.file,
            user_id:req.body.user_id,
            party_id:req.body.party_id
        }).then(result=>{
            res.status(200);
            res.json(result);
        }).catch(err=>next(err));
    }
});

module.exports = router;