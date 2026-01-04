// frontend/src/api/matchApi.js
import { axiosClient } from "./axiosClient";

export const matchApi = {
  getSuggestions() {
    return axiosClient.get("/matches/suggestions");
  },
  sendRequest(payload) {
    return axiosClient.post("/matches/request", payload);
  },
  respond(matchId, action) {
    return axiosClient.post(`/matches/${matchId}/respond`, { action });
  },
  getMyMatches() {
    return axiosClient.get("/matches/mine");
  }
};
