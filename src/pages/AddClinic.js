import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
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

function AddClinic() {
    const [form] = Form.useForm();
    const [country, setCountry] = useState('India');
    const [stateCode, setStateCode] = useState('');
    const [phoneCode, setPhoneCode] = useState('+91');
    const countries = Country.getAllCountries();
    const phoneCodes = [...new Set(countries.map(country => country.phonecode))]
    const onFinish = async (values) => {
        console.log(values);

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
        <Form
        form={form} 
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
            }}
            scrollToFirstError


        >

            <Form.Item label="Input">
                <Input />
            </Form.Item>
            <Form.Item label="Select">
                <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="TreeSelect">
                <TreeSelect
                    treeData={[
                        {
                            title: 'Light',
                            value: 'light',
                            children: [
                                {
                                    title: 'Bamboo',
                                    value: 'bamboo',
                                },
                            ],
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item label="Cascader">
                <Cascader
                    options={[
                        {
                            value: 'zhejiang',
                            label: 'Zhejiang',
                            children: [
                                {
                                    value: 'hangzhou',
                                    label: 'Hangzhou',
                                },
                            ],
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item label="DatePicker">
                <DatePicker />
            </Form.Item>
            <Form.Item label="InputNumber">
                <InputNumber />
            </Form.Item>
            <Form.Item label="WardBoy" valuePropName="checked">
                <Switch /> Doctor
            </Form.Item>
            <Form.Item label="Button">
                <Button>Button</Button>
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
                    // filterOption={(input, option) =>
                    //     option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // }
                    value={State.getStatesOfCountry(country).length === 0 ? '' : form.getFieldValue("state")}
                >
                    {State.getStatesOfCountry(country).map(state => {
                        return <Option key={state.isoCode} value={state.isoCode}>{state.name}</Option>
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
                        return <Option key={country.isoCode} value={country.isoCode}>{country.name}</Option>
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

        </Form>
    );
};
export default AddClinic;
