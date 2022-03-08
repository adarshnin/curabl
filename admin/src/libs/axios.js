import axios from 'axios';
import { authenticationService } from '../services/authservice';

const server = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'x-access-token': authenticationService?.currentUserValue?.token
  }
})

export default server;