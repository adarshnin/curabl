import React, { Component } from "react";

import { TimePicker,Card } from 'antd';

function time_sheduling() {
    return(
        <>
            <TimePicker.RangePicker />
            <div >
            <Card title="Card title2" bordered={false} style={{ width: 300 }}>
            
              
            </Card>
          </div>
            
        </>
    )
}

export default time_sheduling;
