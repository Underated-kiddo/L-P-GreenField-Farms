import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";

export default function ChatRoom() {
  const { id } = useParams(); // ID of user you're chatting with
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const currentUserId = localStorage.getItem("userId"); // store this during login
  const currentUserName = localStorage.getItem("name");

  useEffect(() => {
    // Fetch previous messages between current user and the selected user
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to load chat messages", err);
      }
    };

    fetchMessages();
  }, [id]);

  useEffect(() => {
    // Listen for private messages
    socket.on("receivePrivateMessage", (msg) => {
      if (
        (msg.sender === id && msg.receiver === currentUserId) || // incoming msg from that user
        (msg.sender === currentUserId && msg.receiver === id) // echo your sent msg
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receivePrivateMessage");
  }, [id, currentUserId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const messageData = {
      sender: currentUserId,
      receiver: id,
      user: currentUserName,
      text: input,
    };

    socket.emit("sendPrivateMessage", messageData);
    setInput("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Chat with User {id}</h2>
      <div className="border h-64 overflow-y-scroll p-2 mb-4 rounded bg-white shadow">
        {messages.map((m, i) => (
          <div key={i} className="mb-1">
            <b>{m.user}</b>: {m.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 mr-2 w-2/3"
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} className="bg-green-600 text-white p-2 rounded">
        Send
      </button>
    </div>
  );
}
