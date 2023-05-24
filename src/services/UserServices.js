// import axios from "axios";
import axios from "./custum-axios";

const fetchAllUser = () => {
  return axios.get("/users?page=1");
};

export { fetchAllUser };
