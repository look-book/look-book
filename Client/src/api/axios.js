// import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:3500",
// });
import axios from "axios";
export default {
  saveUser: function (userData) {
    return axios.post("/api/user", userData);
  },
  login: function (userData) {
    return axios.post("/api/user/login", userData);
  },

  signup: function (userData) {
    return axios.post("/api/user/signup", userData);
  },
  logout: function () {
    return axios.post("/api/user/logout");
  },
};
