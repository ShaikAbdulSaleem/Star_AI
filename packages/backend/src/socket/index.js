// packages/backend/src/socket/index.js
import { Server } from "socket.io";
import { ChatMessage } from "../models/ChatMessage.js";
import { Room } from "../models/Room.js";

/**
 * Initialize Socket.IO server and wire up events.
 * Called from src/server.js with the HTTP server instance.
 */
export const initSocket = (httpServer, corsOrigin) => {
  const io = new Server(httpServer, {
    cors: {
      origin: corsOrigin,
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Client joins a specific room id (Mongo Room _id)
    socket.on("joinRoom", ({ roomId }) => {
      if (!roomId) return;
      socket.join(roomId);
      // Optionally emit confirmation
      socket.emit("joinedRoom", { roomId });
    });

    // Handle sending a chat message
    socket.on("sendMessage", async ({ roomId, senderId, content }) => {
      try {
        if (!roomId || !senderId || !content) return;

        const msg = await ChatMessage.create({
          room: roomId,
          sender: senderId,
          content
        });

        await Room.findByIdAndUpdate(roomId, {
          lastMessageAt: new Date()
        });

        io.to(roomId).emit("newMessage", {
          _id: msg._id,
          room: msg.room,
          sender: msg.sender,
          content: msg.content,
          createdAt: msg.createdAt
        });
      } catch (err) {
        console.error("sendMessage error:", err.message);
      }
    });

    // Typing indicator (optional)
    socket.on("typing", ({ roomId, senderId }) => {
      if (!roomId || !senderId) return;
      socket.to(roomId).emit("typing", { roomId, senderId });
    });

    socket.on("stopTyping", ({ roomId, senderId }) => {
      if (!roomId || !senderId) return;
      socket.to(roomId).emit("stopTyping", { roomId, senderId });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

