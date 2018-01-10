const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');
const crypt = require('../helper/crypt');
const fs = require('fs');
router.post('/', (req, res, next) => {

    let file = crypt.encurl("" + new Date());
    fs.writeFileSync("./demo/" + file + ".jpg", req.body.data, 'base64', err => {
        next(err)
    });
    if (fs.existsSync("./demo/" + file + ".jpg")) {
        res.status(203);
        res.json(result);
    }
});
router.get('/:id', (req, res, next) => {
    if (fs.existsSync("./demo/" + req.body.data + ".jpg")) {
        res.json({data: fs.readFileSync("./demo/" + req.body.data + ".jpg", 'base64')});
    } else {
        next({status:404, message: "Kein Bild mit dieser ID!"});
    }
});

module.exports = router;