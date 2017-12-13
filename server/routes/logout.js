const express = require('express');
const router = express.Router();

/**
 * Delete von dem APIKey des Users
 */
router.delete('/', function (req , res, next){
    var key = req.apiKey;
    req.models.APIKey.destroy({where: {apiKey: key}}).then(result => {
        res.status(200);
        res.json({status:"Erfolg"});
    }).catch(err => {
        next(err);
    })
});

module.exports = router;