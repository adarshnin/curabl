import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import VideoConference from './VideoCall';
import Prescription from "./Prescription"
import { authenticationService } from "../services/authservice"
import axios from 'axios';
import {
    DatePicker, Layout, Row,
    Col,
    Card,
    Radio,
    Table,
    Upload,
    message,
    Progress,
    Button,
    Avatar,
    Skeleton,
    Calendar, Select, Typography, Empty, List, Divider, Space,

} from 'antd';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;

function TabToolbar() {
    const [pres_data, getPrescriptions] = useState("");
    const location = useLocation()
    const { patientName, doctorName, date, slottime, patientId, doctorId } = location.state;



    const columns = [
        {
            title: "DRUG",
            dataIndex: "drug",
            key: "drug",
        },
        {
            title: "MORNING",
            dataIndex: "morning",
            key: "morning",
            width: "5%",

        },

        {
            title: "AFTERNOON",
            key: "afternoon",
            dataIndex: "afternoon",
            width: "5%",

        },
        {
            title: "NIGHT",
            key: "night",
            dataIndex: "night",
            width: "5%",

        },
        {
            title: "DAYS",
            key: "days",
            dataIndex: "days",
            width: "5%",

        },
        {
            title: "BEFORE/AFTER FOOD",
            key: "bfaf",
            dataIndex: "bfaf",
            width: "20%",

        },

    ];

    const data = [];
    if (pres_data != "") {

        console.log("pres_data", pres_data[0]["medicines"]);
        for (let i = 0; i < pres_data[0]["medicines"]?.length; i++) {
            var med = pres_data[0]["medicines"][i]
            console.log(i, "$$$");
            data.push({
                key: i,
                drug: (
                    <>

                        <div className="avatar-info">
                            <Title level={5}>{med.medicine}</Title>
                            <p></p>
                        </div>

                    </>
                ),
                morning: (
                    <>
                        <div className="author-info">
                            <center>{med.morning}</center>
                            {/* <p>{med}</p> */}
                        </div>
                    </>
                ),
                afternoon: (
                    <>
                        <div className="author-info">
                            <center> {med.Afternoon}</center>
                            {/* <p>{med}</p> */}
                        </div>
                    </>
                ),
                night: (
                    <>
                        <div className="author-info">
                            <center>   {med.night}</center>
                        </div>
                    </>
                ),
                days: (
                    <>

                        <div className="avatar-info">
                            <center>   <Title level={5}>{med.duration}</Title></center>
                            <p></p>
                        </div>

                    </>
                ),
                bfaf: (
                    <>
                        <div className="author-info">
                            {med.MedTime.toUpperCase()}
                        </div>
                    </>
                ),
            });
        }
    }

    var content;
    const prescription = (<Prescription />)
    const patientTable = (<div>
        <Card bordered={false}
            className="header-solid h-full ant-invoice-card"
            style={{ padding: "2%", marginBlockEnd: "5%", width: "60%", minWidth: "500px"}}
        >

            <List
                itemLayout="horizontal"
                className="invoice-list"

            >

                <List.Item>
                    <List.Item.Meta style={{ marginLeft: '17%' }}
                        title={"Doctor"}
                    />
                    <div className="amount" style={{ marginRight: '22%' }}>{doctorName}</div>
                </List.Item>
                <List.Item>
                    <List.Item.Meta style={{ marginLeft: '17%' }}
                        title={"Disease"}
                    />
                    <div className="amount" style={{ marginRight: '22%' }}>{pres_data[0]?.disease}</div>
                </List.Item>
                <List.Item>
                    <List.Item.Meta style={{ marginLeft: '17%' }}
                        title={"Date"}
                    />
                    <div className="amount" style={{ marginRight: '22%' }}>{date}</div>
                </List.Item>
                <List.Item>
                    <List.Item.Meta style={{ marginLeft: '17%' }}
                        title={"Patient"}
                    />
                    <div className="amount" style={{ marginRight: '22%' }}>{patientName}</div>
                </List.Item>

            </List>
        </Card>
        <div className="table-responsive">

            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 5
                }}
                className="ant-border-space"

            />
        </div></div>
    );

    const isDoctor = authenticationService?.currentUserValue?.isDoctor;
    if (isDoctor) {
        content = prescription;
    } else {
        content = patientTable;
    }


    useEffect(async () => {
        // Your code here

        if (!isDoctor) {
            var res = "";
            try {
                res = await axios.post(`http://localhost:9000/getPrescription`, {
                    doctorId: doctorId,
                    patientId: patientId,
                    slotTime: slottime,
                    date: date
                });
            } catch (err) {
                console.error(err);
            }
            if (res?.data) {
                getPrescriptions(res.data);
                console.log("@@@@", res.data);
            }
        }



    }, []);


    return (
        <>
            <Tabs tabPosition={"left"}>
                <TabPane tab="Video Call" key="1">
                    <VideoConference />

                </TabPane>
                <TabPane tab="Prescription" key="2">
                    {content}
                </TabPane>
                <TabPane tab="Temperature" key="3">
                    Content of Tab 3
                </TabPane>
                <TabPane tab="SPO2" key="4">
                    Content of Tab 4
                </TabPane>
                <TabPane tab="BP" key="5">
                    Content of Tab 5
                </TabPane>
                <TabPane tab="Stethoscope" key="6">
                    Content of Tab 6
                </TabPane>
                <TabPane tab="ECG" key="7">
                    Content of Tab 2
                    record 10/20 sec - send via bluetooth - receive .wav file from instrument - Record heart sound - already Applied ML on it - doctor can view if normal / not
                </TabPane>
                <TabPane tab="Example" key="8">
                    Content of Tab 8
                </TabPane>
                <TabPane tab="Example" key="9">
                    Content of Tab 9
                </TabPane>
                <TabPane tab="Example" key="10">
                    Content of Tab 10
                </TabPane>
                <TabPane tab="Example" key="11">
                    Content of Tab 11
                </TabPane>
            </Tabs>
        </>
    );

}

export default TabToolbar;