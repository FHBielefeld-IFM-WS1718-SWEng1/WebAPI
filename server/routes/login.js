const express = require('express');
const router = express.Router();

router.post('/', function (req, res, next) {
    if('password' in req.body && 'email' in req.body) {
        req.models.User.findAll({where: {email: req.body.email}}).then(function (ergebnisse) {
            // todo hier muss das eingegebene Verschlüsselt werden und dann verglcihen werden
            if (ergebnisse && ergebnisse[0].password == req.body.password) {
                res.status(200);
                // todo hier auch noch einen api key generieren
                res.json(ergebnisse[0]);
            }
            else{
                res.status(400);
                res.json({error: 'Keine Gültiger Request!'});
            }
        })
    }
    else{
        res.status(400);
        res.json({error: "Kein gültiger Request!"});
    }
});
module.exports = router;