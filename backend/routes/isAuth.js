const express = require("express");
const jwt = require("jsonwebtoken");
verifyJWT = require("../middleware/auth");



const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
    console.log("Authenticated",req.userid,req.email);
    res.send({auth:true});
});

module.exports = router;