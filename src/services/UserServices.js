// import axios from "axios";
import axios from "./custum-axios";

const fetchAllUser = (page) => {
  return axios.get(`/users?page=${page}`);
};
const postCreateUser = (name, job) => {
  return axios.post("/api/users", { name: name, job: job });
};

export { fetchAllUser, postCreateUser };
