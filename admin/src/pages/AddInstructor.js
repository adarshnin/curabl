import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Space,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Menu, Dropdown, message
} from 'antd';
import { addressTranslator } from '../libs/utils';
import { DownOutlined } from '@ant-design/icons';
import { UploadOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Card,
    Typography,
    Descriptions,
} from "antd";
import server from '../libs/axios';
import moment from 'moment';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { nameTranslator } from '../libs/utils';


const { Title } = Typography;
const { Option } = Select;

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function AddInstructor() {
    const [form] = Form.useForm();
    const [country, setCountry] = useState('India');
    const [clinics, setClinics] = useState([]);

    const [stateCode, setStateCode] = useState('');
    const [phoneCode, setPhoneCode] = useState('+91');
    const countries = Country.getAllCountries();
    const phoneCodes = [...new Set(countries.map(country => country.phonecode))]
    useEffect(() => {
        const getClinics = async () => {
            let res;
            try {
                res = await server.post(`/addClinic/getall`, {
                });
                if (res?.data) {
                    console.log("data = ", res.data[0]["clinicName"]);
                    setClinics(res.data);

                }
            } catch (err) {
                console.error(err);
            }
        };
        getClinics();
    }, []);
    const onFinish = async (values) => {
        console.log(values);

        var res = "";
        try {
            res = await axios.post(`http://localhost:9000/addInstructor`, values);
        } catch (err) {
            console.error();
            message.error("Check your Internet Connection.");
        }
        console.log("resdata", res?.data);
        //   if (res?.data) {
        //     if (res.data?.error) {
        //       message.error(res.data?.message, 10);
        //     }
        //     else if (res.data?.result) {
        //       console.log("resdata", res.data.result, res.data.token);
        //       localStorage.setItem("token", res.data.token)
        //       localStorage.setItem('currentUser', JSON.stringify(res.data.result));
        //       currentUserSubject.next(res.data.result);
        //       // const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };
        //       // this.props.history.push(from);
        //       // auth.login();
        //       // console.log("is authentated",auth.isAuthenticated());
        //       // await userAuthentication();
        //       this.props.history.push("/adminDashboard");
        //     }
        //   }

    };


    function onCountryChange(value) {
        setCountry(value);
        console.log(`selected ${value}`);
    }
    function onPhoneCodeChange(value) {
        setPhoneCode(value);
        console.log(`selected ${value}`);
    }
    function onStateChange(value) {
        setStateCode(value);
        console.log(`selected ${value}`);
    }
    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="91">+91</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );


    return (
        <Form
            form={form}
            onFinish={onFinish}

            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"

            initialValues={{
                country: "IN",
                state: "Maharashtra",
                date: moment()
            }}
            scrollToFirstError


        >
            <Title level={4} style={{ marginLeft: 20 }}>Add  Instructor</Title>
            <Form.Item label="Name"
                name="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input Name!',
                    },

                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Email"
                name="Email"
                rules={[
                    {
                        required: true,
                        message: 'Please input Email!',
                    },

                ]}
            >
                <Input />
            </Form.Item>



            <Form.Item label="Person" name="person"
                rules={[
                    {
                        required: true,
                        message: 'Please select the option',
                    },

                ]}>

                <Select defaultValue={"Select"} style={{ width: 120 }} >
                    <Option value="doctor">Doctor</Option>
                    <Option value="wardboy">WardBoy</Option>
                </Select>

            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        len: 10,
                        message: 'Please input your phone number!',
                    },

                ]}
            >
                <Input maxLength="10" addonBefore={prefixSelector} style={{ width: '100%' }} />



            </Form.Item>


            <Form.Item
                label="Clinic"
                name="Clinic"
            // rules={[
            //     {
            //     required: true,
            //     message: 'Please select an Clinic!',
            //     },

            // ]}
            >
                <Select
                    showSearch
                    placeholder="Select a Clinic"
                    optionFilterProp="children"
                    onChange={onStateChange}
                    onSearch={onSearch}
                // filterOption={(input, option) =>
                //     option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
                // clinics[0]["clinicName"]
                // value={clnic.length === 0 ? '' : form.getFieldValue("state")}
                >
                    {
                        clinics.map(clinic => {
                            console.log(clinic);
                            return <Option key={clinic["_id"]} value={clinic["_id"]}>{clinic["clinicName"] + ", " + addressTranslator((clinic["address"]))}</Option>
                        })}
                    <Option key="" value="">None</Option>
                </Select>
                {/* <Input maxLength="30" /> */}
            </Form.Item>


            <Form.Item  {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
};
export default AddInstructor;