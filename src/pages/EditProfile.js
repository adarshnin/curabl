import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    DatePicker,
    Upload,
    Space
} from 'antd';
// const { Option } = Select;

import { UploadOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { authenticationService } from "../services/authservice";
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
const pencil = [
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        key={0}
    >
        <path
            d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
            className="fill-gray-7"
        ></path>
        <path
            d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
            className="fill-gray-7"
        ></path>
    </svg>,
];

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
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

const EditProfile = () => {
    const { id, isDoctor } = authenticationService?.currentUserValue
    const serverURL = process.env.REACT_APP_SERVER_URL;
    const [form] = Form.useForm();
    const [country, setCountry] = useState('India');
    const [stateCode, setStateCode] = useState('Maharashtra');
    const [phoneCode, setPhoneCode] = useState('+91');
    const [fileList, setFileList] = useState([]);
    const countries = Country.getAllCountries();
    const phoneCodes = [...new Set(countries.map(country => country.phonecode))]
    // const [filelist, setFilelist] = useState([]);
    // const Countries = countries;
    // const States = State.getAllStates()
    // const Cities = City.getCitiesOfState("IN", "MH");

    console.log(form.getFieldsValue());

    useEffect(() => {
        const getUser = async () => {
            let res, data;
            try {
                console.log(serverURL);
                res = await server.post(`profile/getUser`, {
                    id,
                    isDoctor,
                });
            } catch (err) {
                console.error(err);
            }
            if (res?.data) {
                data = res.data;
                delete data.id;
                form.setFieldsValue({
                    firstName: data?.name?.firstName,
                    middleName: data?.name?.middleName,
                    lastName: data?.name?.lastName,
                    email: data?.email,
                    contactNo: data?.contactNo,
                    dob: moment(data?.dob),
                    gender: data?.gender,
                    bloodGroup: data?.bloodGroup,
                    houseno: data?.address?.houseNo,
                    street: data?.address?.street,
                    landmark: data?.address?.landmark,
                    city: data?.address?.area,
                    district: data?.address?.district,
                    state: data?.address?.state,
                    country: data?.address?.country,
                    pincode: data?.address?.postalCode,
                    services: data?.services,
                    specializations: data?.specializations,
                    memberships: data?.memberships,
                    experience: data?.experience,
                    education: data?.education,
                    registrations: data?.registrations,
                    awardsAndRecognition: data?.awardsAndRecognition,
                    disease: data?.disease,
                    profileImage: data?.profileImage,
                    consultation: data?.fees?.consultation,
                })
            }
            return () => {

            };
        };
        getUser();
    }, []);

    const onFinish = async (values) => {
        console.log(values);
        console.log(values['profileImage']);
        let res, data = new FormData();
        let name = {
            firstName: values.firstName,
            middleName: values.middleName,
            lastName: values.lastName,
        }
        let address = {
            houseNo: values.houseno,
            street: values.street,
            landmark: values.landmark,
            area: values.city,
            district: values.district,
            state: values.state,
            country: values.country,
            postalCode: values.pincode,
        }
        let fees = {
            consultation: values.consultation,
        }
        delete values.houseno
        delete values.street
        delete values.landmark
        delete values.city
        delete values.district
        delete values.state
        delete values.country
        delete values.pincode
        delete values.firstName
        delete values.middleName
        delete values.lastName
        data.append('profileImage', values.profileImage.file.originFileObj);
        data.append('fees', JSON.stringify(fees));
        data.append('name', JSON.stringify(name));
        data.append('address', JSON.stringify(address));
        data.append('email', values.email);
        data.append('contactNo', values.contactNo);
        data.append('dob', values.dob);
        data.append('gender', values.gender);
        data.append('bloodGroup', values.bloodGroup);
        data.append('services', JSON.stringify(values.services));
        data.append('specializations', JSON.stringify(values.specializations));
        data.append('memberships', JSON.stringify(values.memberships));
        data.append('experience', values.experience);
        data.append('education', JSON.stringify(values.education));
        data.append('registrations', JSON.stringify(values.registrations));
        data.append('awardsAndRecognition', JSON.stringify(values.awardsAndRecognition));
        data.append('disease', JSON.stringify(values.disease));
        data.append('id', authenticationService.currentUserValue.id);
        data.append('isDoctor', authenticationService.currentUserValue.isDoctor);
        // values = {
        //     ...values,
        //     name,
        //     address,
        //     profileImage: values.profileImage.file,
        //     id: authenticationService.currentUserValue.id,
        //     isDoctor: authenticationService.currentUserValue.isDoctor,
        //     $update: true,
        // }
        console.log('Received values of form: ');
        for (let i of data.values()) {
            console.log(i);
        }
        try {
            res = await server.post(`/profile/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        } catch (err) {
            console.error(err);
        }
        console.log(res);
        // data = res.data;
        // console.log("Form Data", data);
        // delete data.id;
    };

    const prefixSelector = (
        <Form.Item name="phonePrefix" noStyle>
            <Select
                onChange={onPhoneCodeChange}
                style={{
                    width: 70,
                }}
            >
                {phoneCodes.map(code => {
                    return code && <Option key={code} value={code[0] !== '+' ? `+${code}` : code}>{code[0] !== '+' ? `+${code}` : code}</Option>
                })}
            </Select>
        </Form.Item>
    );
    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="USD">$</Option>
                <Option value="CNY">¥</Option>
            </Select>
        </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const handleFileUploadChange = (d) => {
        console.log("File Data", d);
        let filelist = d.filelist;
        // filelist = filelist.slice(-1);
        // console.log(filelist);
        setFileList(filelist)
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
    return (
        <>

            <Col span={24} md={24} className="mb-24">
                <Card
                    bordered={false}
                    title={<h6 className="font-semibold m-0">Profile Information</h6>}
                    className="header-solid h-full card-profile-information"
                    extra={<Button type="link">{pencil}</Button>}
                    bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                >
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{
                            country: "India",
                            state: "Maharashtra",
                            phonePrefix: '+91',
                        }}
                        scrollToFirstError
                    >
                        <Title level={4} style={{ marginLeft: 20 }}>Personal Details</Title>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your First Name!',
                                },
                            ]}
                        >
                            <Input maxLength="50" />
                        </Form.Item>
                        <Form.Item
                            label="Middle Name"
                            name="middleName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Middle Name!',
                                },
                            ]}
                        >
                            <Input maxLength="50" />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Last Name!',
                                },
                            ]}
                        >
                            <Input maxLength="50" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="contactNo"
                            label="Phone Number"
                            rules={[
                                {
                                    len: 10,
                                    message: "Please enter valid phone number"
                                }
                            ]}
                        >
                            <Input maxLength="10" addonBefore={prefixSelector} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="dob" label="Date of Birth" >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="Gender"
                        >
                            <Select placeholder="Select your Gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Blood Group"
                            name="bloodGroup"
                        >
                            <Select placeholder="Select your Blood Group">
                                <Option value="A+">A+</Option>
                                <Option value="A-">A-</Option>
                                <Option value="B+">B+</Option>
                                <Option value="B-">B-</Option>
                                <Option value="O+">O+</Option>
                                <Option value="O-">O-</Option>
                                <Option value="AB+">AB+</Option>
                                <Option value="AB-">AB-</Option>
                            </Select>
                        </Form.Item>
                        <Title level={4} style={{ marginLeft: 20 }}>Address Details</Title>
                        <Form.Item
                            label="Apartment Number"
                            name="houseno"
                        >
                            <Input maxLength="10" />
                        </Form.Item>
                        <Form.Item
                            label="Street / Society"
                            name="street"
                        >
                            <Input maxLength="50" />
                        </Form.Item>
                        <Form.Item
                            label="Landmark"
                            name="landmark"
                        >
                            <Input maxLength="20" />
                        </Form.Item>
                        <Form.Item
                            label="Village/City/Town"
                            name="city"
                        ><Input maxLength="30" />
                        </Form.Item>
                        <Form.Item
                            label="District"
                            name="district"
                        > <Input maxLength="30" />
                        </Form.Item>
                        <Form.Item
                            label="State"
                            name="state"
                        >
                            <Select
                                showSearch
                                placeholder="Select a State"
                                optionFilterProp="children"
                                onChange={onStateChange}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={State.getStatesOfCountry(country).length === 0 ? '' : form.getFieldValue("state")}
                            >
                                {State.getStatesOfCountry(country).map(state => {
                                    return <Option key={state.isoCode} value={state.name}>{state.name}</Option>
                                })}
                                <Option key="" value="">None</Option>
                            </Select>
                            {/* <Input maxLength="30" /> */}
                        </Form.Item>
                        <Form.Item
                            label="Country"
                            name="country"
                        >
                            <Select
                                showSearch
                                placeholder="Select a Country"
                                optionFilterProp="children"
                                onChange={onCountryChange}
                                onSearch={onSearch}
                                // filterOption={(input, option) =>
                                //     // option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                // }
                            >
                                {countries.map(country => {
                                    return <Option key={country.isoCode} value={country.name}>{country.name}</Option>
                                })}
                            </Select>

                            {/* <Input maxLength="30" /> */}
                        </Form.Item>
                        <Form.Item
                            label="Pincode"
                            name="pincode"
                            rules={[{
                                len: 6,
                                message: "Please enter valid Pincode"
                            }
                            ]}
                        >
                            <Input maxLength="6" />
                        </Form.Item>
                        <Title level={4} style={{ marginLeft: 20 }}>Professional Details</Title>
                        <Form.Item
                            name="experience"
                            label="Years of experience"
                        >
                            <Input maxLength="2" style={{ width: '100%' }} />
                        </Form.Item>
                        <Title level={5} style={{ marginLeft: 20 }}>Services</Title>
                        <Form.List name="services" label="Services">
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => {
                                        // console.log("Form Values", form.getFieldValue())
                                        // console.log("Form", field.key, field.name,);
                                        return (
                                            <Space key={field.key} style={{ marginLeft: "20px", padding: "10px" }} align="baseline">
                                                <Form.Item {...field}>
                                                    <Input style={{ width: "100%" }} maxLength={30} placeholder="Enter a service name" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </Space>
                                        )
                                    })}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add a service
                                        </Button>
                                    </Form.Item>
                                </>)}
                        </Form.List>
                        <Title level={5} style={{ marginLeft: 20 }}>Specializations</Title>
                        <Form.List name="specializations" label="Specializations">
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => {
                                        // console.log("Form Values", form.getFieldValue())
                                        // console.log("Form", field.key, field.name,);
                                        return (
                                            <Space key={field.key} style={{ marginLeft: "20px", padding: "10px" }} align="baseline">
                                                <Form.Item {...field}>
                                                    <Input style={{ width: "100%" }} maxLength={30} placeholder="Enter a specialization" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </Space>
                                        )
                                    })}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add a specialization
                                        </Button>
                                    </Form.Item>
                                </>)}
                        </Form.List>
                        <Title level={5} style={{ marginLeft: 20 }}>Memberships</Title>
                        <Form.List name="memberships" label="Memberships">
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => {
                                        // console.log("Form Values", form.getFieldValue())
                                        // console.log("Form", field.key, field.name,);
                                        return (
                                            <Space key={field.key} style={{ marginLeft: "20px", padding: "10px" }} align="baseline">
                                                <Form.Item {...field}>
                                                    <Input style={{ width: "100%" }} maxLength={30} placeholder="Enter a membership" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </Space>
                                        )
                                    })}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add a membership
                                        </Button>
                                    </Form.Item>
                                </>)}
                        </Form.List>
                        <Title level={5} style={{ marginLeft: 20 }}>Education</Title>
                        <Form.List name="education" label="Education">
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => {
                                        // console.log("Form Values", form.getFieldValue())
                                        // console.log("Form", field.key, field.name,);
                                        return (
                                            <Space key={field.key} style={{ marginLeft: "20px", padding: "10px" }} align="baseline">
                                                <Form.Item {...field}>
                                                    <Input style={{ width: "100%" }} maxLength={30} placeholder="Enter educational details" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </Space>
                                        )
                                    })}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add about education
                                        </Button>
                                    </Form.Item>
                                </>)}
                        </Form.List>
                        <Title level={5} style={{ marginLeft: 20 }}>Registrations</Title>
                        <Form.List name="registrations" label="Registrations">
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => {
                                        // console.log("Form Values", form.getFieldValue())
                                        // console.log("Form", field.key, field.name,);
                                        return (
                                            <Space key={field.key} style={{ marginLeft: "20px", padding: "10px" }} align="baseline">
                                                <Form.Item {...field}>
                                                    <Input style={{ width: "100%" }} maxLength={30} placeholder="Enter registration details" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </Space>
                                        )
                                    })}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add registeration details
                                        </Button>
                                    </Form.Item>
                                </>)}
                        </Form.List>
                        <Title level={5} style={{ marginLeft: 20 }}>Awards and Recognition</Title>
                        <Form.List name="awardsAndRecognition" label="Awards and Recognition">
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => {
                                        // console.log("Form Values", form.getFieldValue())
                                        // console.log("Form", field.key, field.name,);
                                        return (
                                            <Space key={field.key} style={{ marginLeft: "20px", padding: "10px" }} align="baseline">
                                                <Form.Item {...field}>
                                                    <Input style={{ width: "100%" }} maxLength={30} placeholder="Enter any award or recognition" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </Space>
                                        )
                                    })}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add any award or Recognition
                                        </Button>
                                    </Form.Item>
                                </>)}
                        </Form.List>
                        <Title level={5} style={{ marginLeft: 20 }}>I'm specialized in curing</Title>
                        <Form.List name="disease" label="Disease">
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => {
                                        // console.log("Form Values", form.getFieldValue())
                                        // console.log("Form", field.key, field.name,);
                                        return (
                                            <Space key={field.key} style={{ marginLeft: "20px", padding: "10px" }} align="baseline">
                                                <Form.Item {...field}>
                                                    <Input style={{ width: "100%" }} maxLength={30} placeholder="Enter name of a disease" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </Space>
                                        )
                                    })}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add a service
                                        </Button>
                                    </Form.Item>
                                </>)}
                        </Form.List>
                        <Form.Item
                            label="Consultation Fees"
                            name="consultation"
                        > <Input maxLength="3" />
                        </Form.Item>
                        <Form.Item
                            name="profileImage"
                            label="Profile Picture"
                            multiple={false}
                            listType="picture-card"
                            showUploadList={false}
                            action=""
                            extra="Upload your Profile Picture"
                        >
                            <Upload
                            // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                            // action='http://localhost:3000/uploads/avatars/'
                            // onChange={handleFileUploadChange}
                            // fileList={fileList}
                            // // multiple={true}
                            // listType="picture"
                            // accept=".png,.jpeg"
                            // beforeUploading={(file) => {
                            //     console.log("file data ", { file });
                            //     return false;
                            // }}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </>
    );
};

export default EditProfile;