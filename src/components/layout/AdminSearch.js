import React, { useEffect, useState } from "react";
import server from "../../libs/axios";
import { Link } from "react-router-dom";
import { EnvironmentOutlined, MessageOutlined, UpSquareFilled, } from '@ant-design/icons';
import { Button, Input, Skeleton, Avatar, Empty, List, Popover } from 'antd';
import { addressTranslator, nameTranslator, arrayTranslator, imageUrlTranslator, urlTranslator } from "../../libs/utils";
import RocketChat from '../../pages/RocketChat';
import { authenticationService } from "../../services/authservice";

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
            res = await server.post(`/profile/find`, {
                isDoctor: true,
            });
        } catch (err) {
            console.error(err);
        }
        setDataSource(
            res?.data?.filter(item => {
                if (item["userId"] === authenticationService.currentUserValue.id) { return false }
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
                dataSource?.length ?
                    <List
                        header={
                            filter?.length ?
                                <h1>
                                    <b>Search Results: </b>
                                    {dataSource?.length} doctor{dataSource?.length === 1 ? '' : 's'} found
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
                                        content={
                                            item?.address ?
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
                                                    style={{ marginLeft: "5px" }}
                                                />
                                            } />
                                    </Popover>,
                                    <Popover
                                        trigger="click"
                                        placement="topRight"
                                        title="Address"
                                        content={<RocketChat />}>
                                        <Button
                                            block shape="circle"
                                            size="large"
                                            icon={
                                                <MessageOutlined
                                                    style={{ marginLeft: "5px" }}
                                                />
                                            } />
                                    </Popover>,
                                ]}
                            >
                                <Skeleton avatar title={false} loading={false} active>
                                    <List.Item.Meta
                                        avatar={<Avatar src={imageUrlTranslator(item?.profileImage)} />}
                                        // title={<Link to="/profile"><h1><b>{item?.name}</b></h1></Link>}
                                        title={
                                            <Link to={{
                                                pathname: `/searchresult`,
                                                state: {
                                                    id: item?.userId,
                                                    isDoctor: item?.isDoctor,
                                                    name: item?.name,
                                                    fees: item?.fees?.consultation,
                                                }
                                            }}>
                                                <h1><b>{item?.name}</b></h1>
                                            </Link>
                                        }
                                        description={arrayTranslator(item?.disease)}
                                    />
                                    {item?.experience && <p>{item.experience} years of<br />Experience</p>}
                                </Skeleton>
                            </List.Item>
                        )
                        }
                    />
                    : <Empty />
            }
            { }
        </div >
    );
}

export default SearchComponent;