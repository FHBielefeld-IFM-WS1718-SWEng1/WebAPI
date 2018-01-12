const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');
const crypt = require('../helper/crypt');
const fs = require('fs');
router.post('/', (req, res, next) => {

    let file = crypt.encurl("" + new Date());
    fs.writeFileSync("./upload/" + file + ".jpg", req.body.data, 'base64', err => {
        next(err)
    });
    if (fs.existsSync("./upload/" + file + ".jpg")) {
        res.status(203);
        res.json({filename: file});
    }
});
router.get('/:id', (req, res, next) => {
    if (fs.existsSync("./demo/" + req.params.id + ".jpg")) {
        res.json({data: fs.readFileSync("./upload/" + req.params.id + ".jpg", 'base64')});
    } else {
        next({status: 404, message: "Kein Bild mit dieser ID!"});
    }
});

module.exports = router;