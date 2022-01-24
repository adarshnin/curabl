// Doctor
import React, { useState, useEffect } from 'react';
import Modal_shed from "./shedul_modal";
import moment from 'moment'
import styled from 'styled-components';
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
    Calendar, Select, Typography, Empty, List, Divider, Space
} from 'antd';
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Header, Footer, Content } = Layout;


// Get from login state
const patientID = "test123";


const columns = [
    {
        title: "DOCTOR",
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



function Appointments() {
    const [app_data, getAppointments] = useState("");
    const data = [];
    for (let i = 0; i < app_data.length; i++) {
        console.log(i, "$$$");
        data.push({
            key: i,
            dname: (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={40}
                            src={face2}
                        ></Avatar>
                        <div className="avatar-info">
                            <Title level={5}>{app_data[i]['doctorId']}</Title>
                            <p>michael@gmail.com</p>
                        </div>
                    </Avatar.Group>{" "}
                </>
            ),
            slot: (
                <>
                    <div className="author-info">
                        <Title level={5}>{app_data[i]['date']}</Title>
                        <p>{app_data[i]['slottime']}</p>
                    </div>
                </>
            ),
            meeting: (
                <>
                    <Link
                        to={{
                            pathname: app_data[i]['meetingurl'],
                            // state: { fromDashboard: true }
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
                        <span>{app_data[i]['status']}</span>
                        <Button type="primary" danger >Cancel</Button>
                    </div>
                </>
            ),
        });
    }

    useEffect(async () => {
        // Your code here
        var res = "";
        try {
            res = await axios.post(`http://localhost:9000/myappointments/getAppointments`, {
                patientId: patientID
            });
        } catch (err) {
            console.error(err);
        }
        if (res?.data) {
            getAppointments(res.data);
            console.log("@@@@", res.data);
        }

    }, []);
    return (
        <div className="myAppointments" >
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="My Appointments"
                        // extra={
                        //     <>
                        //         <Radio.Group onChange={onChange} defaultValue="a">
                        //             <Radio.Button value="a">All</Radio.Button>
                        //             <Radio.Button value="b">ONLINE</Radio.Button>
                        //         </Radio.Group>
                        //     </>
                        // }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    pagination={true}
                                    className="ant-border-space"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default Appointments;
