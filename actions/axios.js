import axios from "axios";
import {getAuth} from "firebase/auth";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:3030/api",
});

export const axiosAuth = axios.create({
  baseURL: "http://localhost:3030/api",
});

axiosAuth.interceptors.request.use(
  async (config) => {
      const auth = getAuth();
    let user = await auth.currentUser;
    config.headers.token = user ? await user.getIdToken(true) : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
