import React, { useState } from "react";
import moment from "moment";
import { Button, message, DatePicker, Layout, Calendar, Select, Input, Radio, Col, Row, Typography, Empty, Card, List, Divider, Space } from 'antd';
const { Header, Footer, Content } = Layout;
const { Search } = Input;

const data = [
  {
    name: "Dr Prakash Patil",
    diseases: "fever , cough",
    experience: 5
  },
  {
    name: "Dr Avinash Rathod",
    diseases: "dengue , cough",
    experience: 11
  },
  {
    name: "Dr Ravi Patel",
    diseases: "fever , covid",
    experience: 9
  },
  {
    name: "Dr Kavita Diwedi",
    diseases: "Headache , dental",
    experience: 7
  },
  {
    name: "Dr Riya Rao",
    diseases: "Surgery , ENT",
    experience: 23
  },
  {
    name: "Dr Bhakti Dhamangaonkar",
    diseases: "Cold , Asthama",
    experience: 8
  },
]
function SearchComponent() {
  const [filter, setFilter] = useState('');


  function searchText(inputText) {
    console.log("@@Input = ", inputText);
    setFilter(inputText);
  }

  let dataSearch = data.filter(item => {
    return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
  })
  return (
    <div className="Search">
      <Search style={{ margin: "5%", width: "50%", marginLeft: "23%" }}

        placeholder="Search for any doctors, diseases"
        size="large"
        onSearch={searchText}

      />

      {/* <Input style={{ margin: "5%", width: "50%", marginLeft: "23%" }}
        bordered={false}
        size="large"
        // value={filter}

        onChange={searchText}
        placeholder="Search for any keyword" /> */}

      <Row gutter={[24, 0]}>

        {dataSearch.map(item => {

          return (
            <Col span={24} md={8} className="mb-24">
              <Card bordered={false}
                className="header-solid h-full ant-invoice-card"
                style={{ overflow: 'auto' }}
              >
                <Header style={{ fontWeight: 900, fontSize: "12px" }} orientation="left">Doctor</Header>

                <List
                  itemLayout="horizontal"
                  className="invoice-list"

                >
                  <List.Item>
                    <List.Item.Meta style={{ marginLeft: '17%' }}
                      title={"Name:"}
                    />
                    <div className="amount" style={{ marginRight: '22%', paddingLeft: "30%" }}>{item.name}</div>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta style={{ marginLeft: '17%', }}
                      title={"Diseases:"}
                    />
                    <div className="amount" style={{ marginRight: '22%', paddingLeft: "30%" }}>{item.diseases}</div>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta style={{ marginLeft: '17%', }}
                      title={"Experience:"}
                    />
                    <div className="amount" style={{ marginRight: '22%', paddingLeft: "30%" }}>{item.experience} years</div>
                  </List.Item>

                </List>



              </Card>
            </Col>

          )
        }
        )}

      </Row>
    </div>
  );
}

export default SearchComponent;
