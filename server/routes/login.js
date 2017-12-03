const express = require('express');
const router = express.Router();
var CryptoJS = require("crypto-js");

router.post('/', function (req, res, next) {
    if ('password' in req.body && 'email' in req.body) {
        req.models.User.findAll({where: {email: req.body.email}}).then(function (ergebnisse) {
            if (ergebnisse[0] && ergebnisse[0].password == "" + CryptoJS.SHA1(req.body.password)) {
                // TODO wenn bereits ein Key für diesen Nutzer in der Tabelle vorhanden ist kein neuen erstellen! Absprache wie die API reagieren soll 
                var userObjekt = ergebnisse[0].dataValues;
                var keyArray = CryptoJS.SHA1(userObjekt.email + "," + new Date().toLocaleString());
                var key = CryptoJS.enc.Base64.stringify(keyArray);
                console.log("neuer Key: " + key);
                req.models.APIKey.create({user_id: userObjekt.id, apiKey: key}).then((result) => {
                    userObjekt.key = key;
                    delete userObjekt.password;
                    res.status(200);
                    res.json(userObjekt);

                }).catch((err)=>{
                    res.status(500);
                    res.json(err)
                });
            } else {
                res.status(400);
                res.json({error: 'Keine Gültiger Request!'});
            }
        })
    }
    else {
        res.status(400);
        res.json({error: "Kein gültiger Request!"});
    }
});
module.exports = router;