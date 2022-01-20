// import moment from 'moment';
const moment = require("moment");
// var x = {
//     nextSlot: 30,
//     breakTime: [
//         ['11:00', '14:00'], ['16:00', '18:00']
//     ],
//     startTime: '8:00',
//     endTime: '20:00'
// };

const express = require("express");

const router = express.Router();
const Users = require("../models/signupmodel");



function generateSlot(startTime,endtime,slotperiod,waitingtime){
    var slotTime = moment(startTime, "HH:mm");
    console.log(slotTime.format("h:mm"));

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
        
        console.log(info);
        
        morningSlot = generateSlot(info.MstartTime,info.MendTime,info.slotperiod,info.waitingPeriod);
        eveningSlot = generateSlot(info.EstartTime,info.EendTime,info.slotperiod,info.waitingPeriod);
        console.log("morningSlot",morningSlot);
        console.log("evening",eveningSlot);
        res.send(morningSlot.concat(evening));
        
        

    } catch (error) {
        // res.status(400).send(error);
        var data = { error: "Unauthorized Access!", data: "You have entered invalid credentials." }
        console.log("in catch", error);
        res.render("login", data);
    }
});

module.exports = router;


// console.log("Time slots: ", times[1]);