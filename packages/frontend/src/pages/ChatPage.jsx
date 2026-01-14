// packages/frontend/src/pages/ChatPage.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ChatList from "../components/Chat/ChatList";
import ChatRoom from "../components/Chat/ChatRoom";
import VideoCall from "../components/Video/VideoCall";

export default function ChatPage() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-3 gap-4 h-[calc(100vh-80px)]">
      <div className="col-span-1 border rounded p-3 bg-white">
        <h2 className="text-sm font-semibold mb-2">Conversations</h2>
        <ChatList
          selectedRoomId={selectedRoomId}
          onSelectRoom={setSelectedRoomId}
        />
      </div>

      <div className="col-span-2 flex flex-col gap-4">
        <div className="flex-1">
          <ChatRoom roomId={selectedRoomId} currentUserId={user?._id} />
        </div>
        <VideoCall roomId={selectedRoomId} />
      </div>
    </div>
  );
}

