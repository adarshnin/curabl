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


   
    var title = "DOCTOR", query = "is";

    const columns = [
        {
            title: title,
            dataIndex: "dname",
            key: "dname",
            width: "32%",
        },
        {
            title: "SLOT",
            dataIndex: "slot",
            key: "slot",
        },

        {
            title: "MEETING",
            key: "meeting",
            dataIndex: "meeting",
        },
        {
            title: "STATUS",
            key: "status",
            dataIndex: "status",
        },
        
    ];

    const data = [];
    for (let i = 0; i < pres_data.length; i++) {
        console.log(i, "$$$");
        data.push({
            key: i,
            dname: (
                <>

                    <div className="avatar-info">
                        <Title level={5}>{pres_data[i]["doctorName"]}</Title>
                        <p>{title && title[0] + title.slice(1).toLowerCase()}</p>
                    </div>

                </>
            ),
            slot: (
                <>
                    <div className="author-info">
                        <Title level={5}>{pres_data[i]['date']}</Title>
                        <p>{pres_data[i]['slottime']}</p>
                    </div>
                </>
            ),
            meeting: (
                <>
                    <Link
                        to={{
                            pathname: '/call',
                            state: { from: 'myAppointments', meetingurl: pres_data[i]['meetingurl'], patientName: pres_data[i]["patientName"], doctorName: pres_data[i]["doctorName"], date: pres_data[i]['date'], slottime: pres_data[i]['slottime'], patientId: pres_data[i]['patientId'] }
                        }}
                    >
                        <Button type="primary" className="tag-primary">
                            JOIN MEETING
                        </Button>
                    </Link>
                </>
            ),
            status: (
                <>
                    <div className="ant-employed">
                        <span>{
                            pres_data[i]['status']}</span>
                        <Button type="primary" danger >Cancel</Button>
                    </div>
                </>
            ),
        });
    }
    var content;
    const prescription = (<Prescription />)
    const patientTable = (
        <div className="table-responsive">

            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 5
                }}
                className="ant-border-space"

            />
        </div>
    );

    const isDoctor = authenticationService?.currentUserValue?.isDoctor;
    if (isDoctor) {
        content = prescription;
    } else {
        content = patientTable;
    }
    const location = useLocation()
    const { patientName, doctorName, date, slottime, patientId, doctorId } = location.state;

    useEffect(async () => {
        // Your code here

        if (!isDoctor) {
            var res = "";
            try {
                res = await axios.post(`http://localhost:9000/getPrescription`, {
                    doctorId:doctorId ,
                    patientId:patientId,
                    slotTime:slottime,
                    date:date
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
                    <VideoConference>

                    </VideoConference>
                </TabPane>
                <TabPane tab="ECG" key="2">
                    Content of Tab 2
                    record 10/20 sec - send via bluetooth - receive .wav file from instrument - Record heart sound - already Applied ML on it - doctor can view if normal / not
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
                <TabPane tab="Prescription" key="7">
                    {content}
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