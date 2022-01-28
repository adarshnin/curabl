// Doctor
import React, { useState, useEffect } from 'react';
import Modal_shed from "./shedul_modal";
import moment from 'moment'
import styled from 'styled-components';
import axios from 'axios';
import { Button, DatePicker, Layout, Calendar, Select, Radio, Col, Row, Typography, Empty, Card, List, Divider, Space, Modal, message } from 'antd';
import { authenticationService } from "../services/authservice"
import { PatientDetail } from "./SlotItemmodal"


const Listbox = styled.ul`
display: grid;
grid-template-columns: repeat(9, 1fr);
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
background-color: ${props => (props.isValid ? '#a2d8eb' : '#ebb0b0')};
margin: 0;
cursor: pointer;
text-align: center;
// min-width: 99px;
// opacity: ${props => (props.isValid ? 1 : 0.3)};
:hover {
//   cursor: ${props => (props.isValid ? 'pointer' : 'inherit')};
  color: ${props => (props.isValid ? props.theme.primary : 'inherit')};
`;
const { Header, Footer, Content } = Layout;

function isBooked(slot) {
    // console.log(slot);
    if (slot.status == "free")
        return 1;
}

function Scheduling() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [PatientId, setPatientId] = useState("");
    const [modalContent, setmodalContent] = useState(<div>Free Slot</div>);
    const [schedule, setschedule] = useState([]);
    const [date, changeDate] = useState(moment());
    // var modalContent = (<div>Free Slot</div>);
    const showModal = async (slot) => {
        // if(slot?.)
        if (slot.userid) {
            setPatientId(slot.userid);
            setmodalContent(await getuserdetails(slot.userid, slot.date, slot.slottime));

        }
        console.log("slot", slot.userid)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setPatientId("")
        setIsModalVisible(false);
        setmodalContent(<div>Free Slot</div>)
    };

    const handleCancel = () => {
        setPatientId("")
        setIsModalVisible(false);
        setmodalContent(<div>Free Slot</div>)
    };




    // const doctorId = "123";
    useEffect(() => {
        // Your code here
        onChange(date);
    }, []);
    async function onChange(date, dateString) {
        // changeDate(evening_schedule);
        changeDate(date)
        console.log("date check", moment(date, 'DD/MM/YYYY', true).format(), date.format("YYYY-MM-DD"), moment(date.format("YYYY-MM-DD")));
        var res = "";
        try {
            res = await axios.post(`http://localhost:9000/getSlot`, {
                Date: date.format("DD-MM-YYYY"),
                doctorId: authenticationService.currentUserValue?.id
            });
        } catch (err) {
            console.error(err);
        }
        if (res?.data) {
            if (res.data.length < 1) {
                console.log("empty");
                setschedule([])
            }
            else {
                // console.log(res.data);
                // console.log(res.data[0], res.data[0].slottime);
                setschedule(res.data);
            }
            // setschedule(res.data);
        }

    }
    async function getuserdetails(userid, date, time) {
        var res = ""
        try {
            res = await axios.post(`http://localhost:9000/getPatientDetails`, {
                userid: userid,
            });
            console.log("res", res.data);
        } catch (err) {
            console.error(err);
            message.error("Unable to fetch data");
        }
        if (res?.data) {
            if (res.data.length < 1) {
                console.log("empty");
                message.error("Unable to fetch data");

            }
            else {
                var data = res.data
                console.log("ioin else", res.data);
                var temp =

                    (<div>
                        <h3>Slot Booked By</h3>
                        <p>{data.firstName + " " + data.middleName + " " + data.lastName}</p>
                        <p>Date : {date}</p>
                        <p>Slot Time :{time}</p>
                    </div>);
            }

        }

        return temp;

    }




    return (
        <div className="Scheduling" >
            <Row gutter={[24, 0]}>
                <Col span={24} md={24} className="mb-24">
                    <Card bordered={false}
                        className="header-solid h-full ant-invoice-card"
                    >
                        <Header style={{ fontWeight: 900, fontSize: "22px" }} orientation="left">Upcoming Slots</Header>
                        <Header style={{ padding: '10px' }}>

                            <List
                                itemLayout="horizontal"
                                className="invoice-list"

                            >
                                <List.Item>
                                    <List.Item.Meta style={{ marginLeft: '10%' }}
                                        title={
                                            <DatePicker
                                                disabledDate={(current) => {
                                                    return moment().add(-1, 'days') >= current
                                                }}
                                                format="DD-MM-YYYY"
                                                allowClear={false}
                                                // value={date}
                                                onChange={onChange}

                                            />
                                        }
                                    />
                                    <div className="amount" style={{ marginRight: '15%', marginLeft: "10%" }}>Date: {date.format("DD-MM-YYYY")}</div>
                                    <div className="amount" style={{ marginRight: '10%' }}> <Modal_shed Date={date.format("DD-MM-YYYY")} /></div>
                                    <div className="amount" style={{ marginRight: '10%' }}> <Button type="default" onClick={() => {
                                        onChange(date);
                                    }}>Refresh</Button></div>

                                </List.Item>



                            </List>
                        </Header>
                        <Content>
                            <>
                                <Listbox style={{ overflow: 'auto', height: '420px' }}>
                                    {schedule.map(slot => {
                                        // const isValid = validator ? validator(slot) : true;
                                        const isValid = isBooked(slot);
                                        return (
                                            <ListItem
                                                key={slot.slottime}
                                                isValid={isValid}
                                                onClick={() => showModal(slot)}
                                            >
                                                {slot.slottime}
                                            </ListItem>
                                        );
                                    })}
                                </Listbox>

                            </>
                        </Content>
                    </Card>




                </Col>
            </Row>
            <Modal title="Slot" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                {modalContent}

            </Modal>





        </div>
    )
};

export default Scheduling;
