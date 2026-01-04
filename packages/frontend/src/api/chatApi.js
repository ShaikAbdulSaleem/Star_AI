// frontend/src/api/chatApi.js
import { axiosClient } from "./axiosClient";

export const chatApi = {
  getOrCreateRoomFromMatch(matchId) {
    return axiosClient.post("/chat/room-from-match", { matchId });
  },
  getMyRooms() {
    return axiosClient.get("/chat/rooms");
  },
  getRoomMessages(roomId) {
    return axiosClient.get(`/chat/rooms/${roomId}/messages`);
  }
};
