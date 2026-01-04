import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { chatApi } from "../../api/chatApi";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export default function ChatRoom({ roomId, currentUserId }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load history
  useEffect(() => {
    if (!roomId) return;
    (async () => {
      const { data } = await chatApi.getRoomMessages(roomId);
      setMessages(data);
    })();
  }, [roomId]);

  // Socket.io
  useEffect(() => {
    if (!roomId) return;

    const s = io(SOCKET_URL);
    setSocket(s);

    s.emit("joinRoom", { roomId });

    s.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      s.disconnect();
    };
  }, [roomId]);

  const handleSend = () => {
    if (!input.trim() || !socket) return;
    socket.emit("sendMessage", {
      roomId,
      senderId: currentUserId,
      content: input.trim()
    });
    setInput("");
  };

  if (!roomId) return <p>Select a connection to start chatting.</p>;

  return (
    <div className="flex flex-col h-full border rounded">
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`flex ${
              String(m.sender) === String(currentUserId)
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div className="bg-gray-100 px-2 py-1 rounded text-sm max-w-xs">
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-2 flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

