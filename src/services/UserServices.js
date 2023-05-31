// import axios from "axios";
import axios from "./custum-axios";

const fetchAllUser = (page) => {
  return axios.get(`/users?page=${page}`);
};
const postCreateUser = (name, job) => {
  return axios.post("/api/users", { name: name, job: job });
};
const putUpdateUsers = (name, job) => {
  return axios.put("/api/users/2", { name: name, job: job });
};
const deleteUsers = (id) => {
  return axios.delete(`/api/users/${id}`);
};

export { fetchAllUser, postCreateUser, putUpdateUsers, deleteUsers };
