const express = require("express");

const router = express.Router();
const slotmodeltemplate = require("../models/slotmodel");






router.post("/",(req,res)=>{
    console.log(req.body.doctorID)



    const userslot = new slotmodeltemplate({
        doctorId: req.body.doctorId,
        Date: req.body.Date,
        slottime : req.body.slottime,
        slotperiod: req.body.slotperiod,
        url: req.body.url,
        userid : req.body.userid,
        paymentid: req.body.paymentid,
        dayperiod: req.body.dayperiod,
        status : req.body.status
    });
    // res.send("temp"); 
    console.log("donecheck");
    userslot.save()
    .then(data =>{
        res.json(data);
        console.log(data);
    })
    .catch(error =>{
        res.json(error);
        console.log(error);
    })
    // res.sendStatus( 201);
    console.log("done");
});


  

module.exports = router;