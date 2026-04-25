import axios from "axios";

const instance = axios.create({
  baseURL: "https://jobportal-mernstack-4vux.onrender.com",
  withCredentials: true
});

export default instance;