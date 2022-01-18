import React from 'react'

import { Modal, Button, Card, TimePicker, InputNumber } from 'antd';
import { time_sheduling } from "./select_time";

// .site-card-border-less-wrapper {
//   padding: 30px;
//   background: #ececec;
// } 

function onChange(value) {
  console.log('changed', value);
}


class Modal_shed extends React.Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
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
              <time_sheduling />
              <p>Morning
                <TimePicker.RangePicker format={format} />
              </p>
              <p>Evening
                <TimePicker.RangePicker format={format} />
              </p>
              <p>Slot period (in mins)<br></br>
                <InputNumber min={1} max={60} defaultValue={10} onChange={onChange} />
              </p>
              <p>Waiting time between slots(in mins)
                <InputNumber min={1} max={10} defaultValue={5} onChange={onChange} />
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