import React, { useState } from 'react';
import { Descriptions, Card, Tabs, Collapse, List } from 'antd';
import { capitalize } from '../../../libs/utils'

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Meta } = Card;

function DoctorProfile({ data }) {

  return <Card
    title={<h1>Details</h1>}
  >
    <Meta description={data?.description} />
    <Tabs style={{ "margin-top": "10px" }} defaultActiveKey="1" type="card">
      <TabPane tab="Personal" key="1">
        <Descriptions bordered={true} title={<h2>Name</h2>}>
          <Descriptions.Item label="First Name" span={3}>
            {data?.name?.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Middle Name" span={3}>
            {data?.name?.middleName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name" span={3}>
            {data?.name?.lastName}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions bordered={true} title={<h2>Other</h2>}>
          <Descriptions.Item label="Designation" span={3}>
            {data?.designation}
          </Descriptions.Item>
          <Descriptions.Item label="Blood Group" span={3}>
            {data?.bloodGroup}
          </Descriptions.Item>
          <Descriptions.Item label="Date of Birth" span={3}>
            {new Date(data?.dob).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Age" span={3}>
            {data?.age}
          </Descriptions.Item>
          <Descriptions.Item label="Gender" span={3}>
            {capitalize(data?.gender)}
          </Descriptions.Item>
        </Descriptions>
      </TabPane>
      <TabPane tab="Contact" key="2">
        <Descriptions bordered={true} title={<h2>Address</h2>} display={!(data?.address) ? 'none' : 'block'}>
          <Descriptions.Item label="House Number" span={3}>
            {data?.address?.houseNo}
          </Descriptions.Item>
          <Descriptions.Item label="Street" span={3}>
            {data?.address?.street}
          </Descriptions.Item>
          <Descriptions.Item label="Landmark" span={3}>
            {data?.address?.landmark}
          </Descriptions.Item>
          <Descriptions.Item label="Area" span={3}>
            {data?.address?.area}
          </Descriptions.Item>
          <Descriptions.Item label="State" span={3}>
            {data?.address?.state}
          </Descriptions.Item>
          <Descriptions.Item label="Country" span={3}>
            {data?.address?.country}
          </Descriptions.Item>
          <Descriptions.Item label="Postal code" span={3}>
            {data?.address?.postalCode}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions bordered={true} title={<h2>Other</h2>}>
          <Descriptions.Item label="Email" span={3}>
            {data?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Mobile Number" span={3}>
            {data?.contactNo}
          </Descriptions.Item>
        </Descriptions>
      </TabPane>
      <TabPane tab="Professional" key="3">
        <Descriptions title={<h2><b>Experience: </b>{data?.experience} years</h2>}>
        </Descriptions>
        <Collapse>
          <Panel showArrow={false} header={"Disease"}>
            <List dataSource={data?.disease} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
          <Panel showArrow={false} header={"Services"}>
            <List dataSource={data?.services} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
          <Panel showArrow={false} header={"Specializations"}>
            <List dataSource={data?.specializations} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
          <Panel showArrow={false} header={"Memberships"}>
            <List dataSource={data?.memberships} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
          <Panel showArrow={false} header={"Education"}>
            <List dataSource={data?.education} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
          <Panel showArrow={false} header={"Registrations"}>
            <List dataSource={data?.registrations} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
          <Panel showArrow={false} header={"Awards and Recognitions"}>
            <List dataSource={data?.awardsAndRecognition} renderItem={item => <List.Item>{item}</List.Item>} />
          </Panel>
        </Collapse>
      </TabPane>
    </Tabs>
  </Card>;
}

export default DoctorProfile;
