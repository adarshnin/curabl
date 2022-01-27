// Doctor
import React, { useState, useEffect } from 'react';
import Modal_shed from "./shedul_modal";
import moment from 'moment'
import styled from 'styled-components';
import axios from 'axios';
import { authenticationService } from "../services/authservice"

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


const isDoctor = authenticationService.currentUserValue?.isDoctor

const userID = authenticationService.currentUserValue?.id;

var query;
if (isDoctor) {
    query = "patientId";
}
else {
    query = "doctorId";
}

console.log("isDoctor == ", isDoctor);
const columns = [
    {
        title: "PERSON",
        dataIndex: "person",
        key: "person",
        width: "25%",
    },
    {
        title: "DATE",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "AMOUNT",
        key: "amount",
        dataIndex: "amount",
    },
    {
        title: "PAYMENT ID",
        key: "paymentid",
        dataIndex: "paymentid",
    },
    {
        title: "ORDER ID",
        key: "orderid",
        dataIndex: "orderid",
    },
    {
        title: "STATUS",
        key: "status",
        dataIndex: "status",
    },
];



function Payments() {
    console.log("in mu payments")
    const [payment_data, getPayments] = useState("");
    const data = [];
    console.log("######", userID);
    for (let i = 0; i < payment_data.length; i++) {
        console.log(i, "$$$");
        data.push({
            key: i,
            person: (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={40}
                            src={face2}
                        ></Avatar>
                        <div className="avatar-info">
                            <Title level={5}>{payment_data[i][query]}</Title>
                            <p>michael@gmail.com</p>
                        </div>
                    </Avatar.Group>{" "}
                </>
            ),
            date: (
                <>
                    <div className="author-info">
                        <Title level={5}>{payment_data[i]['date']}</Title>
                    </div>
                </>
            ),
            amount: (
                <>
                    <div className="author-info">
                        <Title level={5}>₹ {payment_data[i]['amount']}</Title>
                    </div>
                </>
            ),
            paymentid: (
                <>
                    <div className="ant-employed">
                        <span>{payment_data[i]['paymentID']}</span>
                    </div>
                </>
            ),
            orderid: (
                <>
                    <div className="ant-employed">
                        <span>{payment_data[i]['orderID']}</span>
                    </div>
                </>
            ),
            status: (
                <>
                    <div className="ant-employed">
                        <span>{payment_data[i]['status']}</span>
                    </div>
                </>
            ),
        });
    }

    useEffect(async () => {
        // Your code here
        if (isDoctor) {
            var res = "";
            try {
                res = await axios.post(`http://localhost:9000/payment/getPayments`, {
                    // @@@@@@@ or can be doctorid

                    doctorId: userID,
                    isDoctor: isDoctor
                });
            } catch (err) {
                console.error(err);
            }
            if (res?.data) {
                getPayments(res.data);
                console.log("@@@@", res.data);
            }
        }
        else {

            var res = "";
            try {
                res = await axios.post(`http://localhost:9000/payment/getPayments`, {
                    patientId: userID,
                    isDoctor: isDoctor

                });
            } catch (err) {
                console.error(err);
            }
            if (res?.data) {
                getPayments(res.data);
                console.log("@@@@", res.data);
            }
        }


    }, []);
    return (
        <div className="myPayments" >
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="My Payments"
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

export default Payments;
