// frontend/src/api/userApi.js
import { axiosClient } from "./axiosClient";

export const userApi = {
  me() {
    return axiosClient.get("/users/me");
  },
  updateProfile(data) {
    return axiosClient.put("/users/me", data);
  }
};
