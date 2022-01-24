const moment = require("moment");
const express = require("express");
const router = express.Router();
const slotmodeltemplate = require("../models/slotmodel");




function generateSlot(startTime,endtime,slotperiod,waitingtime){
    var slotTime = moment(startTime, "HH:mm");
    // console.log(slotTime.format("h:mm"));

    var endTime = moment(endtime, "HH:mm");
    var nextSlot = parseInt(slotperiod) + parseInt(waitingtime);

    

    let times = [];
    while (slotTime < endTime)
    {
        
        times.push(slotTime.format("HH:mm"));
        slotTime = slotTime.add(nextSlot, 'minutes');
    }
    return times
}

router.post("/", async (req, res) => {
    try {
        const info = req.body;
        
        console.log("this info",info);
        
        morningSlot = generateSlot(info.MstartTime,info.MendTime,info.slotperiod,info.waitingPeriod);
        eveningSlot = generateSlot(info.EstartTime,info.EendTime,info.slotperiod,info.waitingPeriod);
        // console.log("morningSlot",morningSlot);
        // console.log("evening",eveningSlot);
        slots = morningSlot.concat(eveningSlot);
        // console.log(slots);
        {slots.map(slot => {
            // const isValid = validator ? validator(slot) : true;
            var slot_period = ""
            if( moment(slot,"HH:mm") < moment("15:00", "HH:mm")){
                slot_period = "morning";
            }else{
                slot_period = "evening";
            }
            // console.log(slot);
            const userslot = new slotmodeltemplate({
                doctorId: info.doctorId,
                date: info.Date,
                slottime : slot,
                slotperiod: info.slotperiod,
                url: "",
                userid : "",
                paymentid: "",
                dayperiod: slot_period,
                status : "free"
            });
            // res.send("temp"); 
            // console.log("donecheck");
            userslot.save()
            .then(data =>{
                
                console.log(data.date);
            })
            .catch(error =>{
                res.send("fail to generate slot");
                console.log(error);
                return;
            })
            // res.sendStatus( 201);
            // console.log("done");
            
        })}    
        res.send("Done");

    } catch (error) {
        // res.status(400).send(error);
        var data = { error: "Unauthorized Access!", data: "You have entered invalid credentials." }
        console.log("in catch", error);
        res.render("login", data);
    }

});

module.exports = router;


