import dateFns from 'date-fns';
import React from 'react';
import moment from 'moment';
// import { compareAsc, format } from 'date-fns'
// const {dateFns} = require('date-fns');

// const now = new Date();
// const offsetHours = dateFns.getHours(now);
// console.log(now, offsetHours);
// console.log(new Date())

// function generateTimeSlots(selectedDate, slotSizeMinutes) {
//   const isToday = dateFns.isToday(new Date(selectedDate));
//   console.log(isToday)

//   let start = selectedDate;
//   if (isToday) {
//     const now = new Date();
//     // const offsetHours = 5;
    
//     // "Pad" the start time with the amount of hours of the current time, to
//     // prevent rendering time slots of the past
//     start = dateFns.addHours(start, 5);
//     start = dateFns.addMinutes(start, 30);
//     console.log("start" , start);

//     // The start positions might still be in the past in terms of minutes
//     // So "pad" the start time with the slot size, to prevent rendering time
//     // slots of the past
 
//   }

//   const end = dateFns.addDays(selectedDate, 1);
//   console.log("end" , end);


//   let slot = start;
//   let timeSlots = [];
//   while (slot <= end) {
//     timeSlots.push(slot);
//     slot = dateFns.addMinutes(slot, slotSizeMinutes);
//   }

//   return timeSlots;
// }

// console.log(generateTimeSlots(new Date(), 15));

var x = {
  nextSlot: 1,
  breakTime: [
      ['11:00', '14:00'], ['16:00', '18:00']
  ],
  startTime: '8:00',
  endTime: '20:00'
};

var slotTime = moment(x.startTime, "HH:mm");
var endTime = moment(x.endTime, "HH:mm");

function isInBreak(slotTime, breakTimes) {
  return breakTimes.some((br) => {
    return slotTime >= moment(br[0], "HH:mm") && slotTime < moment(br[1], "HH:mm");
});
}

let times = [];
while (slotTime < endTime)
{
if (!isInBreak(slotTime, x.breakTime)) {
   times.push(slotTime.format("HH:mm"));
}
slotTime = slotTime.add(x.nextSlot, 'minutes');
}

console.log("Time slots: ", times);