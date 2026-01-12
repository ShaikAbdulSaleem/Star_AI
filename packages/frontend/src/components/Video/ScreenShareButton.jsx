// packages/frontend/src/components/Video/ScreenShareButton.jsx
export default function ScreenShareButton({ isSharing, onToggle }) {
  const label = isSharing ? "Stop share" : "Share screen";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={
        "px-3 py-1 rounded-full text-xs " +
        (isSharing
          ? "bg-red-600 text-white"
          : "bg-gray-700 text-white")
      }
    >
      {label}
    </button>
  );
}

