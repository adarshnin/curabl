import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { EnvironmentOutlined } from '@ant-design/icons';
import { Button, Input, Skeleton, Avatar, Empty, List, Popover } from 'antd';
import { addressTranslator, nameTranslator, arrayTranslator, urlTranslator } from "../../libs/utils";

const { Search } = Input;

function SearchComponent() {
  const serverURL = process.env.REACT_APP_SERVER_URL;
  const filterFields = [
    "name",
    "disease",
    "experience",
  ];
  const [filter, setFilter] = useState('');
  const [dataSource, setDataSource] = useState([]);

  function onGettingSearchWord(inputText) {
    console.log("@@Input = ", inputText);
    setFilter(inputText);
  }

  const refineData = (data) => {
    data.name = nameTranslator(data);
    data.completeAddress = addressTranslator(data?.address)
    return data;
  };

  const getDoctors = async () => {
    let res;
    try {
      res = await axios.post(`${serverURL}/profile/find`, {
        isDoctor: true,
      });
    } catch (err) {
      console.error(err);
    }
    setDataSource(
      res.data.filter(item => {
        item = refineData(item);
        return filterFields.some(key => item[key] && item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
      })
    )
  };

  useEffect(() => {
    getDoctors();
  }, [filter]);

  return (
    <div className="Search">
      <Search style={{ margin: "5px" }}
        placeholder="Search for any doctors, diseases"
        size="large"
        onSearch={onGettingSearchWord}
      />
      {
        dataSource.length ?
          <List
            header={
              filter.length ?
                <h1>
                  <b>Search Results: </b>
                  {dataSource.length} doctor{dataSource.length === 1 ? '' : 's'} found
                </h1> :
                <h1>
                  All doctors
                </h1>}
            className="demo-loadmore-list"
            itemLayout="horizontal"
            size="large"
            dataSource={dataSource}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <Popover
                    trigger="click"
                    placement="topRight"
                    title="Address"
                    content={item?.address ?
                      <address>
                        {item?.address?.houseNo}<br />
                        {item?.address?.street}<br />
                        {item?.address?.landmark}<br />
                        {item?.address?.area}<br />
                        {item?.address?.district}<br />
                        {item?.address?.state}<br />
                        {item?.address?.country}-{item?.address?.postalCode}<br />
                      </address> : "Not provided"
                    }>
                    <Button
                      block shape="circle"
                      size="large"
                      icon={
                        <EnvironmentOutlined
                          style={{ "margin-left": "5px" }}
                        />
                      } />
                  </Popover>
                ]}
              >
                <Skeleton avatar title={false} loading={false} active>
                  <List.Item.Meta
                    avatar={<Avatar src={urlTranslator(item?.profileImage)} />}
                    title={<Link to="/profile"><h1><b>{item?.name}</b></h1></Link>}
                    description={arrayTranslator(item?.disease)}
                  />
                  {item?.experience && <p>{item.experience} years of<br />Experience</p>}
                </Skeleton>
              </List.Item>
            )}
          />
          : <Empty />
      }
      {/* <Row gutter={[24, 0]}>
        {dataSource.map((item, index) => {
          return (
            <Col key={index} span={24} md={8} className="mb-24">
              <Card bordered={false}
                title={item.name}
                className="header-solid h-full ant-invoice-card"
                style={{ overflow: 'auto' }}
                extra={
                  <Popover title="Address" content={item?.address ?
                    <address>
                      {item?.address?.houseNo}<br />
                      {item?.address?.street}<br />
                      {item?.address?.landmark}<br />
                      {item?.address?.area}<br />
                      {item?.address?.district}<br />
                      {item?.address?.state}<br />
                      {item?.address?.country}-{item?.address?.postalCode}<br />
                    </address> : "Not provided"
                  }>
                    <EnvironmentOutlined />
                  </Popover>}>
                <Meta
                  style={{ marginLeft: '17%' }}
                  description={arrayTranslator(item.disease)}
                />
                {item.experience}
              </Card>
            </Col>
          )
        }
        )}
      </Row> */}
    </div>
  );
}

export default SearchComponent;
