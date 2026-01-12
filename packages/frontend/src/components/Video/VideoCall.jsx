// packages/frontend/src/components/Video/VideoCall.jsx
export default function VideoCall({ roomId }) {
  if (!roomId) {
    return (
      <div className="border rounded p-4 bg-white text-sm text-gray-500">
        Select a chat room or connection to start a video session.
      </div>
    );
  }

  return (
    <div className="border rounded p-4 bg-white flex flex-col gap-3 h-full">
      <div className="flex justify-between items-center">
        <div className="text-sm font-semibold">
          Video room: <span className="font-mono text-xs">{roomId}</span>
        </div>
        <span className="text-[11px] text-gray-400">
          Placeholder UI – plug Twilio/VideoSDK/WebRTC here later.
        </span>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-3">
        <div className="bg-gray-900 rounded flex items-center justify-center text-xs text-gray-300">
          Local video
        </div>
        <div className="bg-gray-800 rounded flex items-center justify-center text-xs text-gray-300">
          Remote video
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button className="px-3 py-1 rounded-full bg-gray-700 text-white text-xs">
          Toggle mic
        </button>
        <button className="px-3 py-1 rounded-full bg-gray-700 text-white text-xs">
          Toggle camera
        </button>
        <button className="px-3 py-1 rounded-full bg-red-600 text-white text-xs">
          End call
        </button>
      </div>
    </div>
  );
}

