import server from '../libs/axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { LeftCircleFilled } from '@ant-design/icons';
import Appointment from './Appointment';

function SearchedProfile() {
  const { id, isDoctor } = useLocation().state;
  const history = useHistory();
  console.log("Searching for", id, isDoctor);

  return <>
    <Button type="link" icon={<LeftCircleFilled />} onClick={() => history.goBack()}>Go to Results</Button>
    {isDoctor ? <Appointment doctorID={id} isDoctor={isDoctor} /> : <></>}
  </>;
}

export default SearchedProfile;
