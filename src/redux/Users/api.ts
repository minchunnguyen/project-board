import api from '../api.config';
import User from '../../interfaces/User';

const apiEndpoint =  'https://backendtest.bluecoindolphin.club/';
const getUsersData = async () => {
  
  try {
    const token = sessionStorage.getItem('access_token') || '';
    const res = await api.get(
      //'https://5e5fcfafcbbe0600146cb3c8.mockapi.io/api/demo/users',
      `${apiEndpoint}users/search`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const getUserDetail = async (userId: string) => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    const res = await api.get(
      //`https://5e5fcfafcbbe0600146cb3c8.mockapi.io/api/demo/users/${userId}`,
      `${apiEndpoint}users/getUserById/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const addUser = async (user: User) => {
  try {

    const res = await api.post(
      `${apiEndpoint}users`,
      user,
      //{ headers: { Authorization: `Bearer ${token}` }}
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (userId: string, user: User) => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    await api.put(
      `${apiEndpoint}users/${userId}`,
      user,
      { headers: { Authorization: `Bearer ${token}` }}
    );
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (userId: string) => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    await api.delete(
      //`https://5e5fcfafcbbe0600146cb3c8.mockapi.io/api/demo/users/${userId}`,
      `${apiEndpoint}users/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error(error);
  }
};

const changePassword = async (oldpassword: string, newpassword: string) => {
  try {
    const token = sessionStorage.getItem('access_token') || '';
    const respond = await api.post(
      `${apiEndpoint}users/password`,
      {password:oldpassword, newPassword: newpassword},
      { headers: { Authorization: `Bearer ${token}` }}
    )
    console.log("mess: ", respond);
    return respond.data;
  } catch (error) {
    console.error(error);
  };
}

const createUploadFileChannel = async (userId: string, file : File) => {
  const token =sessionStorage.getItem('access_token') || '' ;
  const endpoint = `${apiEndpoint}users/${userId}`;

  try {
    let data = new FormData();
    data.append('files', file);
    await api.put(
      endpoint,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error(error);
  }
}

export default {
  getUsersData,
  getUserDetail,
  addUser,
  updateUser,
  deleteUser,
  changePassword,
  createUploadFileChannel
};
