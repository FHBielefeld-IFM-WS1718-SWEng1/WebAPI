const express = require('express');
const router = express.Router();

/**
 * Delete von dem APIKey des Users
 */
router.delete('/', function (req, res, next) {
    // TODO der Key steht wie bei jedem Request vorerst im Query somit nicht im body
    if ("apiKey" in req.body) {
        // TODO hier wird auch reingegangen wenn kein gültiger apiKey übergeben wird z.b. delete auf 'localhost:8080/logout?api='
        var key = req.body.apiKey;
        req.models.APIKey.destroy({where: {apiKey: key}}).then(result => {
            res.status(200);
        }).catch(err => {
            // TODO Fehlender Response außerdem wäre hier ein next(err) besser da der Error handler dadurch aufgerufen wird und bessere Fehlermeldungen liefert da dies ein 5XX error ist
            res.status(400);
        });
    } else {
        // TODO Fehlender res.json
        res.status(404);
    }
    // TODO Fehlender res.json außerdem Doppelter Response
    res.status(400);
});
module.exports = router;