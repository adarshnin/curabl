// Patient
import React, { useState } from 'react'
import DayTimePicker from '@mooncake-dev/react-day-time-picker';


function Appointment() {


    return (
        <div className="Appointment">
            <DayTimePicker timeSlotSizeMinutes={10} />;
        </div>
    )
}

export default Appointment;
