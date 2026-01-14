import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ChatList from "../components/Chat/ChatList";
import VideoCall from "../components/Video/VideoCall";

export default function VideoPage() {
  const { user } = useAuth();
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  return (
    <div className="grid grid-cols-3 gap-4 h-[calc(100vh-80px)]">
      <div className="col-span-1 border rounded p-3 bg-white">
        <h2 className="text-sm font-semibold mb-2">Rooms</h2>
        <ChatList
          selectedRoomId={selectedRoomId}
          onSelectRoom={setSelectedRoomId}
        />
      </div>
      <div className="col-span-2">
        <VideoCall roomId={selectedRoomId} currentUserId={user?._id} />
      </div>
    </div>
  );
}

