const express = require('express');
const router = express.Router();

/**
 * Delete von dem APIKey des Users
 */
router.delete('/', function (req , res, next){
    if( req.params.apiKey && "apiKey" in req.params){
        var key = req.body.apiKey
        req.models.APIKey.destroy({where: {apiKey: key}}).then(result => {
            res.status(200);
        }).catch(err => {
            next(err);
        })
    } else {
        res.status(404)
        res.json({id:"missing", name:"apiKey"});
    }
});
module.exports = router;