const express = require('express');
const router = express.Router();

/**
 * Delete von dem APIKey des Users
 */
router.delete('/', function (req, res, next) {
    if ("apiKey" in req.body) {
        var key = req.body.apiKey;
        req.models.APIKey.destroy({where: {apiKey: key}}).then(result => {
            res.status(200);
        }).catch(err => {
            res.status(400);
        });
    } else {
        res.status(404);
    }
    res.status(400);
});
module.exports = router;