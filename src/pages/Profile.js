
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Row,
  Col,
  Card,
  Avatar,
} from "antd";
import axios from "axios";

import BgProfile from "../assets/images/bg-profile.jpg";
import PatientProfile from '../components/Profiles/PatientProfile/PatientProfile'
import DoctorProfile from '../components/Profiles/DoctorProfile/DoctorProfile'
import { imageUrlTranslator, } from "../libs/utils";
import { authenticationService } from "../services/authservice";

function Profile() {
  const serverURL = process.env.REACT_APP_SERVER_URL;
  const [user, setUser] = useState();

  useEffect(() => {
    const auth = authenticationService.currentUserValue;
    const getUser = async () => {
      let res, data;
      try {
        console.log(serverURL, auth);
        res = await axios.post(`${serverURL}profile/getUser`, {
          id: auth.id,
          isDoctor: auth.isDoctor,
        }, {
          headers: {
            "x-access-token": auth.token,
          }
        });
      } catch (err) {
        console.error(err);
      }
      if (res?.data) {
        data = res.data;
        console.log("Get User", data);
        delete data.id;
        setUser(data);
      }
      return () => {

      };
    };
    getUser();
  }, []);

  const pencil = [
    <svg
      width="50"
      height="50"
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
  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={imageUrlTranslator(user?.profileImage)} />
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{`${user?.name?.firstName} ${user?.name?.lastName}`}</h4>
                  <p>{user?.isDoctor ? "Doctor" : "Patient"}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Link to="/editprofile">
                {pencil}
              </Link>
            </Col>
          </Row>
        }
      ></Card>{
        authenticationService.currentUserValue.isDoctor ?
          <DoctorProfile data={user} /> :
          <PatientProfile data={user} />}
    </>
  );
}

export default Profile;
