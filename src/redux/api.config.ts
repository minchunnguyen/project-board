import axios from "axios";
// import Cookies from "js-cookie";
// const token = Cookies.get("Token");
const config = {
  // baseURL: "https://backendtest.bluecoindolphin.club",
  // timeout: 2000,
  // headers: {
  //   Authorization: "Bearer " + token,
  //   "Content-Type": "application/json",
  // },
};

export default axios.create(config);
