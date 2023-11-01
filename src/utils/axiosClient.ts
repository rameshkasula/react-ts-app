import axios from "axios";

interface Headers {
  [key: string]: string;
}

const token = window.localStorage.getItem("token");

const headers: Headers = {
  "Content-type": "application/json",
};

if (token) {
  headers["Authorization"] = `Bearer ${token}`;
}

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:9015/api/v1",
  headers: headers,
});

export default axiosClient;
