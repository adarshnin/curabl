import axios from 'axios';

// export const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_ROCKETCHAT_URL,
//   headers: {
//     'X-Auth-Token': rocketChatAdminAuthToken,
//     'X-User-Id': rocketChatAdminUserId
//   }
// });

const rocketChatServer = process.env.REACT_APP_ROCKETCHAT_URL;
let rocketChatAdminUserId = 'aobEdbYhXfu5hkeqG';
let rocketChatAdminAuthToken = '9HqLlyZOugoStsXCUfD_0YdwnNnunAJF8V47U3QHXSq';
 
export async function fetchAdminCredentials() {
  const user = process.env.REACT_APP_ROCKETCHAT_ADMIN;
  const password = process.env.REACT_APP_ROCKETCHAT_PASSWORD
  const data = loginUser(user, password);
  console.log(data);
  rocketChatAdminUserId = data.userId;
  rocketChatAdminAuthToken = data.authToken;
}

export async function fetchUser (username) {
  const rocketChatUser = await axios({
    method: 'get',
    url: `${rocketChatServer}/api/v1/users.info`,
    params: {
      username: username
    },
    headers: {
      'X-Auth-Token': rocketChatAdminAuthToken,
      'X-User-Id': rocketChatAdminUserId
    }
  });
  return rocketChatUser;
}
 
export async function loginUser (email, password) {
  const response = await axios({
    url: `${rocketChatServer}/api/v1/login`,
    method: 'POST',
    data: {
      user: email,
      password: password
    }
  });
  return response;
}
 
export async function createUser(username, name, email, password) {
  const rocketChatUser = await axios({
    url: `${rocketChatServer}/api/v1/users.create`,
    method: 'POST',
    data: {
      name,
      email,
      password,
      username,
      verified: true
    },
    headers: {
      'X-Auth-Token': rocketChatAdminAuthToken,
      'X-User-Id': rocketChatAdminUserId
    }
  });
  return rocketChatUser;
}
 
export async function createOrLoginUser (username, name, email, password,) {
  try {
    const user = await fetchUser(username);
    console.log(user);
    // Perfom login
    return await loginUser(email, password);
  } catch (ex) {
    if (ex.statusCode === 400) {
      // User does not exist, creating user
      const user = await createUser(username, name, email, password);
      console.log(user);
      // Perfom login
      return await loginUser(email, password);
    } else {
      throw ex;
    }
  }
}