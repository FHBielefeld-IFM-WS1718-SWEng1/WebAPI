const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');

router.get('/:id', function (req, res, next){
    if(util.hasKey(req.params,"id")){

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

