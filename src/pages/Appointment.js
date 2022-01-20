// Doctor

import React, { useState } from 'react';
import Modal_shed from "./shedul_modal";
import moment from 'moment'
import styled from 'styled-components';
import { Link } from 'react-router-dom';



import { Button, DatePicker, Layout, Calendar, Select, Radio, Col, Row, Typography, Empty, Card, List, Divider, Space } from 'antd';

const Listbox = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  grid-gap: 1em;
  list-style: none;
  margin: 0;
  padding: 1em;
  height: 355px;
  overflow: auto;
  border-top: 1px solid ${props => props.theme.secondary};
`;
const ListItem = styled.li`
  padding: 0.75em 0.5em;
  border: 1px solid;
  background-color: lightblue;
  margin: 0;
  cursor: pointer;
  text-align: center;
  min-width: 99px;
`;
const { Header, Footer, Content } = Layout;

function onPanelChange(value, mode) {
    console.log(value, mode);
}
function onSelect(value) {
    console.log(value, "date selecteed");
}

function Appointment() {
    var morning_schedule = [9, 9.15, 9.30, 9.45, 10, 10.15, 10.30, 10.45, 11, 11.15, 11.30, 11.45, 12, 12.15, 34, 3434, 98, 65, 23432, 536, 4, 3436, 76, 123, 87, 3444, 171, 43, 4550];
    var evening_schedule = [6, 6.34, 7.45, 8, 8.34, 8.7545, 9, 10, 11];
    const [date, changeDate] = useState("");
    const [timeslot, submitted] = useState("");

    const timeSlotsContent = (<div>
        <Header style={{ fontWeight: 900, fontSize: "22px" }} orientation="left">Select Slot</Header>
        <Header style={{ padding: '10px', alignContent: "left" }}>
            <DatePicker
                disabledDate={(current) => {
                    return moment().add(-1, 'days') >= current
                }}
                format="DD-MM-YYYY"
                onChange={onChange} />

        </Header>
        <Content>
            <>
                <Listbox style={{ overflow: 'auto', height: '420px' }}>
                    {morning_schedule.map(slot => {
                        // const isValid = validator ? validator(slot) : true;
                        return (
                            <ListItem
                                key={slot}

                                // isValid={isValid}
                                onClick={() => onSelectSlot(slot)}
                            >
                                {slot}
                            </ListItem>
                        );
                    })}
                </Listbox>
            </>
        </Content>
    </div>
    );
    const submitContent = (
        <div><Header style={{ fontWeight: 900, fontSize: "22px" }} orientation="left">Appointment Datails</Header>

            <List
                itemLayout="horizontal"
                className="invoice-list"

            >
                <List.Item style={{ marginLeft: '37%' }}>
                    <List.Item.Meta
                        title={<Button onClick={() => onSelectSlot("")}>Go Back</Button>
                        }
                    />
                </List.Item>
                <List.Item>
                    <List.Item.Meta style={{ marginLeft: '17%' }}
                        title={"Date"}
                    />
                    <div className="amount" style={{ marginRight: '22%' }}>{date}</div>
                </List.Item>
                <List.Item>
                    <List.Item.Meta style={{ marginLeft: '17%' }}
                        title={"Slot"}
                    />
                    <div className="amount" style={{ marginRight: '22%' }}>{timeslot}</div>
                </List.Item>
                <List.Item style={{ marginLeft: '33%' }}>
                    <List.Item.Meta
                        title={<Button type='primary'>Confirm Schedule</Button>
                        }
                    />
                </List.Item>

            </List>

        </div>);

    let content;

    if (timeslot == "") {
        content = timeSlotsContent;
    } else {
        content = submitContent;
    }

    function onChange(date, dateString) {
        changeDate(dateString);
        // Selected a date or changed , picked
        console.log(dateString);
    }

    function onSelectSlot(slot) {
        // When a slot is selected
        submitted(slot);
        console.log(slot, " Slot is selected")
    }

    return (
        <div className="Appointment">
            <Row gutter={[24, 0]}>
                <Col span={24} md={8} className="mb-24">
                    <Card bordered={false}
                        className="header-solid h-full ant-invoice-card"
                    >
                        {content}



                    </Card>
                </Col>
            </Row>
        </div>
    )
};

export default Appointment;
