import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:3000/api/users",
  headers: {
    "Content-type": "application/json"
  }
});