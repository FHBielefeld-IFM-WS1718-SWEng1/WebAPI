const express = require('express');
const router = express.Router();
const util = require('../helper/utilities');
const fs = require('fs');
router.post('/', (req, res, next) => {
    fs.writeFile("./demo/1.jpg", req.body.data,'base64' , next);
    //res.status(200);
    //res.json({works:"works"});
});


module.exports = router;