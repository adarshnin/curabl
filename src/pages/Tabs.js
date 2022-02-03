import { Tabs, Radio, Space } from 'antd';
import VideoConference from './VideoCall';
import Prescription from "./Prescription"
const { TabPane } = Tabs;

function TabToolbar() {

    return (
        <>
            <Tabs tabPosition={"left"}>
                <TabPane tab="Video Call" key="1">
                    <VideoConference>

                    </VideoConference>
                </TabPane>
                <TabPane tab="ECG" key="2">
                    Content of Tab 2
                    record 10/20 sec - send via bluetooth - receive .wav file from instrument - Record heart sound - already Applied ML on it - doctor can view if normal / not
                </TabPane>
                <TabPane tab="Temperature" key="3">
                    Content of Tab 3
                </TabPane>
                <TabPane tab="SPO2" key="4">
                    Content of Tab 4
                </TabPane>
                <TabPane tab="BP" key="5">
                    Content of Tab 5
                </TabPane>
                <TabPane tab="Stethoscope" key="6">
                    Content of Tab 6
                </TabPane>
                <TabPane tab="Prescription" key="7">
                    <Prescription />
                </TabPane>
                <TabPane tab="Example" key="8">
                    Content of Tab 8
                </TabPane>
                <TabPane tab="Example" key="9">
                    Content of Tab 9
                </TabPane>
                <TabPane tab="Example" key="10">
                    Content of Tab 10
                </TabPane>
                <TabPane tab="Example" key="11">
                    Content of Tab 11
                </TabPane>
            </Tabs>
        </>
    );

}

export default TabToolbar;