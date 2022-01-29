// Doctor
import React, { useState, useEffect } from 'react';
import Modal_shed from "./shedul_modal";
import moment from 'moment'
import styled from 'styled-components';
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
const isDoctor = authenticationService.currentUserValue?.isDoctor

const userID = authenticationService.currentUserValue?.id;

var query;

if (isDoctor) {
    query = "patientName";
}
else {
    query = "doctorName";
}
var title;
if (isDoctor) {
    title = "PATIENT";
}
else {
    title = "DOCTOR";
}
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



function Appointments() {
    console.log("in mu appointments")
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
                            <Title level={5}>{app_data[i][query]}</Title>
                            <p>{title && title[0] + title.slice(1).toLowerCase()}</p>
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
                            pathname: '/call',
                            state: { from: 'myAppointments', meetingurl: app_data[i]['meetingurl'] }
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
                            app_data[i]['status']}</span>
                        <Button type="primary" danger >Cancel</Button>
                    </div>
                </>
            ),
        });
    }

    useEffect(async () => {
        // Your code here
        var res = "";

        if (isDoctor) {
            var res = "";
            try {
                res = await axios.post(`http://localhost:9000/myappointments/getAppointments`, {
                    // @@@@@@@ or can be doctorid

                    doctorId: userID,
                    isDoctor: isDoctor
                });
            } catch (err) {
                console.error(err);
            }
            if (res?.data) {
                getAppointments(res.data);
                console.log("@@@@", res.data);
            }
        }
        else {

            var res = "";
            try {
                res = await axios.post(`http://localhost:9000/myappointments/getAppointments`, {
                    patientId: userID,
                    isDoctor: isDoctor

                });
            } catch (err) {
                console.error(err);
            }
            if (res?.data) {
                getAppointments(res.data);
                console.log("@@@@", res.data);
            }
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
                            extra={
                                <>
                                    <p className="card-header-date">
                                        <span>Total: {data.length}</span>
                                    </p>
                                </>
                            }
                        >

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
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default Appointments;
