var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send(res.data);
    console.log(res.body);
});

module.exports = router;