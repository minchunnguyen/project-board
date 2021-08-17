import axios from "axios";

export const logInProcess = (data: any) => {
  return axios.post('https://backendtest.bluecoindolphin.club/users/auth/login', data);
};

export const registerProcess = (data: any) => {
  return axios.post('https://backendtest.bluecoindolphin.club/users', data);
}

export const refreshToken = async (data: any) => {
  return await axios.post('https://backendtest.bluecoindolphin.club/users/refresh-token', data);
}

export default {
  logInProcess,
  registerProcess,
  refreshToken,
};
