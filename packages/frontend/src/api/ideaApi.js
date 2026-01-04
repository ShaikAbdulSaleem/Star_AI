// frontend/src/api/ideaApi.js
import { axiosClient } from "./axiosClient";

export const ideaApi = {
  createIdea(data) {
    return axiosClient.post("/ideas", data);
  },
  updateIdea(id, data) {
    return axiosClient.put(`/ideas/${id}`, data);
  },
  getMyIdeas() {
    return axiosClient.get("/ideas/mine");
  }
};
