import axios from "axios";

const API_URL = "http://10.198.186.68:6116/api/auth/";

const register = (username, email, entity, role, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    entity,
    role,
    password,
  });
};

const login = (entity, username, password) => {
  return axios
    .post(API_URL + "signin", {
      entity,
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
