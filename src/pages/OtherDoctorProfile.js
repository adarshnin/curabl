import React, { useState, useEffect } from 'react';
import DisplayDetails from '../components/Profiles/OtherDoctorProfile/DisplayDetails';
import { Button } from 'antd';
import server from 'axios';
import { LeftCircleFilled } from '@ant-design/icons'

function OtherDoctorProfile({ userId, isDoctor }) {
  const [user, setUser] = useState({});
  console.log(userId, isDoctor);
  useEffect(() => {
    const getUser = async () => {
      let res;
      console.log("searcching")
      try {
        res = await server.post('/profile/getUser', {
          id: userId,
          isDoctor
        });
      } catch (err) {
        console.error(err);
      }
      console.log(res.data);
      setUser(res.data);
    }
    getUser();
  }, [userId]);
  return <>
    {/* <Button type="link" icon={<LeftCircleFilled />} onClick={() => history.goBack()}>Go to Results</Button> */}
    <DisplayDetails user={user} />
  </>;
}

export default OtherDoctorProfile;
