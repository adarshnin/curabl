// Doctor

import React, { useState } from 'react';
import Modal_shed from "./shedul_modal";
import moment from 'moment'
import styled from 'styled-components';



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
  text-align: center;
//   not required
  :hover {
    cursor: ${props => (props.isValid ? 'pointer' : 'inherit')};
    color: ${props => (props.isValid ? "props.theme.primary" : 'inherit')};
  }
`;
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
    var morning_shedule = [9, 9.15, 9.30, 9.45, 10, 10.15, 10.30, 10.45, 11, 11.15, 11.30, 11.45, 12, 12.15,30, 9.45, 10, 10.15, 10.30, 10.45, 11, 11.15, 11.30, 11.45, 12, 12.15];
    var evening_shedule = [];

    return (
        // center the element
        <div className="Scheduling" style={{}}>
            <Card bordered={true} style={{ width: 450, height: 600 }}>

                {/* <Layout> */}
                <Header style={{ padding: '10px', marginLeft: '12%' }}>
                    <DatePicker
                        disabledDate={(current) => {
                            return moment().add(-1, 'days') >= current
                        }}

                        onChange={onChange} />
                    <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <Modal_shed /></Header>
                <Content>
                    <>
                        <Divider orientation="left"> Your Slots</Divider>
{/* 
                        <List style={{ overflow: 'auto', height: '220px' }}
                            // header={<div>Header</div>}
                            // footer={<div>Footer</div>}
                            bordered
                            dataSource={morning_shedule}
                            renderItem={item => (
                                <List.Item>
                                    <Typography.Text mark>{item}</Typography.Text>
                                    <Button type="primary" danger>
                                        Delete
                                    </Button>
                                </List.Item>
                            )}
                        /> */}

                        <Listbox style={{ overflow: 'auto', height: '420px' }}>
                            {morning_shedule.map(slot => {
                                // const isValid = validator ? validator(slot) : true;
                                return (
                                    <ListItem
                                        key={slot}
                                        // isValid={isValid}
                                        onClick={() => alert(slot)}
                                    >
                                        {slot}
                                    </ListItem>
                                );
                            })}
                        </Listbox>

                    </>
                </Content>

                {/* </Layout> */}
            </Card>

        </div>

        //   mountNode,
    )
};

export default Scheduling;
