// Patient
import React, { useState } from 'react'
import DayTimePicker from '@mooncake-dev/react-day-time-picker';

function timeSlotValidator(slotTime) {

    // const morningTime = new Date(
    //     slotTime.getFullYear(),
    //     slotTime.getMonth(),
    //     slotTime.getDate(),
    //     09,
    //     7,
    //     0
    // );

    const eveningTime = new Date(
        slotTime.getFullYear(),
        slotTime.getMonth(),
        slotTime.getDate(),
        23,
        7,
        0
    );
    const isValid = slotTime.getTime() > eveningTime.getTime() ;

    console.log("@@@ = ", isValid);
    return isValid;
}

function Appointment() {


    return (
        <div className="Appointment">
            <DayTimePicker
                timeSlotSizeMinutes={15}
                timeSlotValidator={timeSlotValidator}
            />;
        </div>
    )
}

export default Appointment;
