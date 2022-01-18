// Doctor

import React, { useState } from 'react';
import Modal_shed from "./shedul_modal";


import { DatePicker, Layout, Calendar, Select, Radio, Col, Row, Typography, Empty, Card, List, Divider, Space } from 'antd';

const { Header, Footer, Content } = Layout;

function onPanelChange(value, mode) {
    console.log(value, mode);
}
function onSelect(value) {
    console.log(value, "date selecteed");
}
function onChange(date, dateString) {
    console.log(date, dateString);
}

function Scheduling() {
    var morning_shedule = [9, 9.15, 9.30, 9.45, 10, 10.15, 10.30, 10.45, 11, 11.15, 11.30, 11.45, 12, 12.15];
    var evening_shedule = [];

    return (
        // center the element
        <div className="Scheduling" style={{ }}>
            <Card bordered={true} style={{ width: 450, height: 600 }}>

                {/* <Layout> */}
                <Header style={{ padding: '10px', marginLeft: '12%' }}> <DatePicker   minDate={moment().toDate()}
onChange={onChange} />
                    <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <Modal_shed /></Header>
                <Content>
                    <>
                        <Divider orientation="left"> Your Slots</Divider>

                        <List style={{ overflow: 'auto', height: '220px' }}
                            // header={<div>Header</div>}
                            // footer={<div>Footer</div>}
                            bordered
                            dataSource={morning_shedule}
                            renderItem={item => (
                                <List.Item>
                                    <Typography.Text mark>{item}</Typography.Text>
                                </List.Item>
                            )}
                        />
                    </>
                </Content>

                {/* </Layout> */}
            </Card>

        </div>

        //   mountNode,
    )
};

export default Scheduling;
