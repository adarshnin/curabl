import React from 'react'

import { Modal, Button, Card,TimePicker,InputNumber } from 'antd';
import {time_sheduling} from "./select_time";

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
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Modal with customized footer
        </Button>
        <Modal
          visible={visible}
          title="Title"
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
            <Card title="Card title" bordered={false} style={{ width: 300 }}>
            <time_sheduling/>
            <p>Morning</p>
            <TimePicker.RangePicker />
            <p>Evening</p>
            <TimePicker.RangePicker />
            <p>Slot period (in mins)</p>
            <InputNumber min={1} max={60} defaultValue={10} onChange={onChange} />
            <p>waiting time between slots(in mins)</p>
            <InputNumber min={1} max={10} defaultValue={5} onChange={onChange} />
            </Card>
          </div>
                   
          
        </Modal>
      </>
    );
  }
}


// ReactDOM.render(<App />, mountNode);
export default Modal_shed;