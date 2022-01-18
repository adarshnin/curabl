// Doctor

import React, { useState } from 'react';
import Modal_shed from "./shedul_modal";


import { Layout,Calendar, Select, Radio, Col, Row, Typography,Empty,Card,List, Divider } from 'antd';

const { Header, Footer, Content } = Layout;

function onPanelChange(value, mode) {
  console.log(value, mode);
}
function onSelect(value){
    console.log(value,"date selecteed");
}


function Scheduling() {
    var morning_shedule = [9,9.15,9.30,9.45,10,10.15,10.30,10.45,11,11.15,11.30,11.45,12,12.15];
    var evening_shedule = [];

    return(
        <>
    <Row>
      <Col span={12}>
      <div className="site-card-border-less-wrapper">
        <Card bordered={true} style={{ width: 400 ,height:400 }}>
                    
        <div className="site-calendar-customize-header-wrapper">
            <Calendar
            fullscreen={false}
            headerRender={({ value, type, onChange, onTypeChange }) => {
                const start = 0;
                const end = 12;
                const monthOptions = [];

                const current = value.clone();
                const localeData = value.localeData();
                const months = [];
                for (let i = 0; i < 12; i++) {
                current.month(i);
                months.push(localeData.monthsShort(current));
                }
                console.log(current);
                for (let index = start; index < end; index++) {
                monthOptions.push(
                    <Select.Option className="month-item" key={`${index}`}>
                    {months[index]}
                    </Select.Option>,
                );
                }
                const month = value.month();

                const year = value.year();
                const options = [];
                for (let i = year ; i < year + 10; i += 1) {
                options.push(
                    <Select.Option key={i} value={i} className="year-item">
                    {i}
                    </Select.Option>,
                );
                }
                return (
                <div style={{ padding: 8 }}>
                    <Typography.Title level={4}>Custom header</Typography.Title>
                    <Row gutter={8}>
                    <Col>
                        <Radio.Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                        <Radio.Button value="month">Month</Radio.Button>
                        <Radio.Button value="year">Year</Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col>
                        <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        className="my-year-select"
                        onChange={newYear => {
                            const now = value.clone().year(newYear);
                            onChange(now);
                        }}
                        value={String(year)}
                        >
                        {options}
                        </Select>
                    </Col>
                    <Col>
                        <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        value={String(month)}
                        onChange={selectedMonth => {
                            const newValue = value.clone();
                            newValue.month(parseInt(selectedMonth, 10));
                            onChange(newValue);
                        }}
                        >
                        {monthOptions}
                        </Select>
                    </Col>
                    </Row>
                </div>
                );
            }}
            onPanelChange={onPanelChange}
            
            onSelect={onSelect}

            />
        </div>
        </Card>
                </div>
        </Col>
        <Col span={12}>
                <div className="site-card-border-less-wrapper">
                    <Card bordered={true} style={{ width: 400 ,height:400 }}>
                        <Layout>
                            <Header><Modal_shed/></Header>
                            <Content>
                                <>
                                    <Divider orientation="left">Default Size</Divider>
                                    <List
                                    header={<div>Header</div>}
                                    footer={<div>Footer</div>}
                                    bordered
                                    dataSource={morning_shedule}
                                    renderItem={item => (
                                        <List.Item>
                                        <Typography.Text mark>{item}</Typography.Text> 
                                        </List.Item>
                                    )}
                                    />
                                    
                                    
                                </>
                            </Content>
                        
                        </Layout>
                    </Card>
                </div>,
            
        </Col>
    </Row>
    </>
//   mountNode,
)};

export default Scheduling;
