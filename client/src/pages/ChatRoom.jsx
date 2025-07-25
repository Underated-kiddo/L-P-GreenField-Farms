import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import api from "../api/axiosInstance"; // ✅ Import centralized API

export default function ChatRoom() {
  const { id } = useParams(); // ID of user you're chatting with
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const currentUserId = localStorage.getItem("userId");
  const currentUserName = localStorage.getItem("name");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/messages/${id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch chat history:", err.message);
      }
    };

    fetchMessages();
  }, [id]);

  useEffect(() => {
    socket.on("receivePrivateMessage", (msg) => {
      if (
        (msg.sender === id && msg.receiver === currentUserId) ||
        (msg.sender === currentUserId && msg.receiver === id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receivePrivateMessage");
  }, [id, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const messageData = {
      sender: currentUserId,
      receiver: id,
      user: currentUserName,
      text: input.trim(),
    };

    socket.emit("sendPrivateMessage", messageData);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-semibold">Chat with User {id}</h2>

      <div className="border h-72 overflow-y-auto p-3 mb-4 rounded bg-white shadow">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded max-w-xs ${
              m.sender === currentUserId
                ? "ml-auto bg-green-100 text-right"
                : "mr-auto bg-gray-100 text-left"
            }`}
          >
            <div className="text-sm font-semibold">{m.user}</div>
            <div className="text-sm">{m.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border p-2 mr-2 flex-grow rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
