// import axios from "axios";
import axios from "./custum-axios";

const fetchAllUser = (page) => {
  return axios.get(`/users?page=${page}`);
};

export { fetchAllUser };
