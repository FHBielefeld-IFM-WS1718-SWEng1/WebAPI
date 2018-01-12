const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');

router.get('/:id', function (req, res, next){
    if(util.hasKey(req.params,"id")){
        var id = req.params.id;
        req.models.Comment.findById(id).then(result=>{
           if(result){
               res.status(200);
               res.json(result);
           } else{
               res.status(400);
               res.json({error: "Kein Kommentar mit der ID " + id});
           }
        });
    } else {
        next({status: 400, id: "missing", name: "id"});
    }
});

router.delete('/:id', function (req, res, next){
    if(util.hasKey(req.params,"id")){
        var id = req.params.id;
        req.models.Comment.findById(id).then(result =>{
            if(result) {
                result.destroy().then(r => {
                    res.status(200);
                    res.json({message: "Erfolg"});
                }).catch(err => next(err));
            } else {
                next({status: 400, message: "Kein Element mit dieser ID gefunden!"});
            }
        }).catch(err => next(err));
    } else {
        next({status: 400, id: "missing", name: "id"});
    }
});

router.post('/', function (req, res, next){
    if(util.hasKey(req.body,'user_id') && util.hasKey(req.body,'party_id')){
        req.models.create({text:req.body.text,user_id:req.body.user_id,party_id:req.body.party_id})
            .then(result=>{
                res.status(203);
                res.json(result);
            }).catch(err => next(err));
    } else{
        next({status: 400, id: "missing", name: "ID"});
    }
});

