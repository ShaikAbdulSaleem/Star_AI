// frontend/src/api/milestoneApi.js
import { axiosClient } from "./axiosClient";

export const milestoneApi = {
  create(data) {
    return axiosClient.post("/milestones", data);
  },
  updateStatus(id, status) {
    return axiosClient.patch(`/milestones/${id}/status`, { status });
  },
  getForIdea(ideaId) {
    return axiosClient.get(`/milestones/idea/${ideaId}`);
  }
};
