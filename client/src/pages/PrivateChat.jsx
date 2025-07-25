import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import api from "../api/axiosInstance"; // 👈 central Axios instance

export default function PrivateChat() {
  const { userId } = useParams();
  const roomId = [localStorage.getItem("userId"), userId].sort().join("_");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [typing, setTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    socket.emit("joinPrivateRoom", roomId);

    socket.on("receivePrivateMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", ({ user }) => {
      if (user === userId) {
        setTyping(true);
        setTimeout(() => setTyping(false), 2000);
      }
    });

    return () => {
      socket.off("receivePrivateMessage");
      socket.off("typing");
    };
  }, []);

  const handleTyping = () => {
    socket.emit("typing", { roomId, user: localStorage.getItem("userId") });
  };

  const sendMessage = async () => {
    let imageUrl = null;
    if (file) {
      try {
        const data = new FormData();
        data.append("image", file);
        const res = await api.post("/upload", data);
        imageUrl = res.data.url;
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }

    const message = {
      from: localStorage.getItem("name"),
      text: input,
      imageUrl,
      seen: false,
    };

    socket.emit("sendPrivateMessage", { roomId, message });
    setInput("");
    setFile(null);
    setShowEmoji(false);
  };

  const onEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl mb-2 font-bold">👤 Private Chat</h2>
      <div className="border h-64 overflow-y-scroll p-2 rounded-md bg-white dark:bg-gray-800">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <b>{m.from}</b>: {m.text}
            {m.imageUrl && <img src={m.imageUrl} alt="sent" className="w-32 mt-2 rounded" />}
          </div>
        ))}
        {typing && <p className="italic text-sm text-gray-500">Typing...</p>}
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleTyping();
          }}
          className="flex-1 border p-2 rounded"
        />
        <button onClick={() => setShowEmoji((prev) => !prev)} className="px-2">😊</button>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
      {showEmoji && (
        <div className="mt-2">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
}
