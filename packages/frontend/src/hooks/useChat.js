// packages/frontend/src/hooks/useChat.js
import { useEffect, useState } from "react";
import { chatApi } from "../api/chatApi";
import { useSocket } from "../context/SocketContext";

export default function useChat(roomId, currentUserId) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load history
  useEffect(() => {
    if (!roomId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const { data } = await chatApi.getRoomMessages(roomId);
        setMessages(data);
      } catch (err) {
        console.error("Failed to load messages", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [roomId]);

  // Realtime updates
  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit("joinRoom", { roomId });

    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.emit("leaveRoom", { roomId });
    };
  }, [socket, roomId]);

  const sendMessage = (content) => {
    if (!socket || !roomId || !content.trim()) return;
    socket.emit("sendMessage", {
      roomId,
      senderId: currentUserId,
      content: content.trim()
    });
  };

  return {
    messages,
    loading,
    sendMessage
  };
}

