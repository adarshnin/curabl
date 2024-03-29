import React, { useState } from 'react'
import axios from 'axios';
import {authenticationService} from "../services/authservice"

import { Modal, Button, Card, TimePicker, InputNumber, message } from 'antd';
// import { useState } from 'react';

// .site-card-border-less-wrapper {
//   padding: 30px;
//   background: #ececec;
// } 




class Modal_shed extends React.Component {
  handleMorningSlot = (e) => {
    console.log(e);
    this.setState({ user: { ...this.state.user, MstartTime: e } });
  }
  // handleEveningSlot = (e) => {
  //   console.log(e);
  //   this.setState({ user: { ...this.state.user, EstartTime: e } })
  // }
  handleslotPeriod = (e) => {
    console.log(e);
    this.setState({ user: { ...this.state.user, slotPeriod: e } })
  }
  handlewaitingPeriod = (e) => {
    console.log(e);
    this.setState({ user: { ...this.state.user, waitingPeriod: e } })
  }

  state = {
    loading: false,
    visible: false,
    user: {
      MstartTime: "",  slotPeriod: 0, waitingPeriod: 0
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async () => {
    this.setState({ loading: true });
    const doctorName = authenticationService.currentUserValue?.username + " " + authenticationService.currentUserValue?.middleName+ " " + authenticationService.currentUserValue?.lastName
    // console.log("slottime", this.state.user.EstartTime[0].format("HH:mm"));
    // console.log("slottime", this.state.user.EstartTime[0]);
    const serverURL = process.env.REACT_APP_SERVER_URL;
    let res, data;
    try {
      console.log("this is date", this.props.Date, this.props);
      console.log("id : ",authenticationService.currentUserValue.id)
      res = await axios.post(` http://localhost:9000/generateSlot`, {

        "doctorId": authenticationService.currentUserValue?.id,
        "Date": this.props.Date,
        "waitingPeriod": this.state.user.waitingPeriod,
        "slotperiod": this.state.user.slotPeriod,
        "MstartTime": this.state.user.MstartTime[0].format("HH:mm"),
        "MendTime": this.state.user.MstartTime[1].format("HH:mm"),
        // "EstartTime": this.state.user.EstartTime[0].format("HH:mm"),
        // "EendTime": this.state.user.EstartTime[1].format("HH:mm"),
        "doctorName": doctorName


      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
    if (res.data) {
      message.success('Slots Created. Click Refresh button to display your slots.', 10);
      this.setState({ loading: false, visible: false });

    }

  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading, user } = this.state;
    const format = 'HH:mm';


    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Edit Slots
        </Button>
        <Modal
          visible={visible}
          title="Select Times"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,

          ]}
        >

          <div >
            <Card bordered={false} style={{ width: 300 }}>
              {/* <time_sheduling /> */}
              <p>Slots
                <TimePicker.RangePicker
                  format={format}
                  value={user.MstartTime}
                  onChange={this.handleMorningSlot}

                />
              </p>
              {/* <p>Evening
                <TimePicker.RangePicker format={format}
                  value={user.EstartTime}
                  onChange={this.handleEveningSlot}
                />
              </p> */}
              <p>Slot period (in mins)<br></br>
                <InputNumber
                  min={1}
                  max={60}

                  required={true}
                  value={user.slotPeriod}
                  onChange={this.handleslotPeriod}
                />
              </p>
              <p>Waiting time between slots(in mins)
                <InputNumber
                  min={0}
                  max={60}

                  value={user.waitingPeriod}
                  onChange={this.handlewaitingPeriod}
                />
              </p>
            </Card>
          </div>


        </Modal>
      </>
    );
  }
}


// ReactDOM.render(<App />, mountNode);
export default Modal_shed;