import React, { useState } from 'react';
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
} from 'antd';
import {
    Card,
    Typography,
    Descriptions,
} from "antd";

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
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+91</Option>
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

    return (
        <>

            <Col span={24} md={16} className="mb-24">
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
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Title level={5} style={{ marginLeft: 20 }}>Personal Details</Title>

                        <Form.Item
                            label="Full Name"
                            name="fullname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Full Name!',
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
                            name="phone"
                            label="Phone Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!'
                                },
                                {
                                    len: 10,
                                    message: "Please enter valid phone number"
                                }]}
                        >
                            <Input maxLength="10" addonBefore={prefixSelector} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="dob" label="Date of Birth"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Date of Birth!',
                                },
                            ]}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select gender!',
                                },
                            ]}
                        >
                            <Select placeholder="Select your Gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Blood Group"
                            name="bloodg"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select Blood Group!',
                                },
                            ]}
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


                        <Title level={5} style={{ marginLeft: 20 }}>Address Details</Title>

                        <Form.Item
                            label="Apartment Number"
                            name="apartmentno"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Apartment Number',
                                }
                            ]}
                        >
                            <Input maxLength="10" />
                        </Form.Item>
                        <Form.Item
                            label="Street / Society"
                            name="street"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Street / Society',
                                }
                            ]}
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
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Village/City/Town',
                                }
                            ]}
                        >
                            <Input maxLength="30" />
                        </Form.Item>
                        <Form.Item
                            label="District"
                            name="district"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your District',
                                }
                            ]}
                        >
                            <Input maxLength="30" />
                        </Form.Item>
                        <Form.Item
                            label="State"
                            name="state"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your State',
                                }
                            ]}
                        >
                            <Input maxLength="30" />
                        </Form.Item>
                        <Form.Item
                            label="Country"
                            name="country"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Country',
                                }
                            ]}
                        >
                            <Input maxLength="30" />
                        </Form.Item>
                        <Form.Item
                            label="Pincode"
                            name="pincode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Pincode',
                                }, {
                                    len: 6,
                                    message: "Please enter valid Pincode"
                                }
                            ]}
                        >
                            <Input maxLength="6" />
                        </Form.Item>


                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}
                            {...tailFormItemLayout}
                        >
                            <Checkbox>
                            I agree to the <a href="">Terms and Conditions</a>
                            </Checkbox>
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