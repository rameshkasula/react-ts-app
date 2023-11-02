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
  baseURL: "https://code-collab-api.vercel.app/api/v1",
  headers: headers,
});

export default axiosClient;
