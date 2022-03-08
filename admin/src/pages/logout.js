import React, { Component } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";

import { authenticationService } from "../services/authservice"
import { Redirect } from 'react-router-dom';
import axios from 'axios';


export default function logout() {

  authenticationService.logout()
  return (<Redirect to={{ pathname: '/sign-in' }} />)
}
