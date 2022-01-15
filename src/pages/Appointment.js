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

    // Gets the selected date
    console.log("!@@", slotTime.getDate());

    // Query to mongodb Doctor schedule database
    // Get the start and end times

    const morningStartTime = new Date(
        slotTime.getFullYear(),
        slotTime.getMonth(),
        slotTime.getDate(),
        11,
        0,
        0
    );
    const morningEndTime = new Date(
        slotTime.getFullYear(),
        slotTime.getMonth(),
        slotTime.getDate(),
        14,
        0,
        0
    );

    const eveningStartTime = new Date(
        slotTime.getFullYear(),
        slotTime.getMonth(),
        slotTime.getDate(),
        16,
        0,
        0
    );
    const eveningEndTime = new Date(
        slotTime.getFullYear(),
        slotTime.getMonth(),
        slotTime.getDate(),
        19,
        0,
        0
    );

    const isValid = (slotTime.getTime() >= morningStartTime.getTime() && slotTime.getTime() <= morningEndTime.getTime()) || (slotTime.getTime() >= eveningStartTime.getTime() && slotTime.getTime() <= eveningEndTime.getTime());

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
