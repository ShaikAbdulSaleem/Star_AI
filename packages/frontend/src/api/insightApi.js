// frontend/src/api/insightApi.js
import { axiosClient } from "./axiosClient";

export const insightApi = {
  getRiskTrend(ideaId) {
    return axiosClient.get(`/insights/ideas/${ideaId}/risk-trend`);
  }
};
