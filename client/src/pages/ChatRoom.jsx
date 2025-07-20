import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const user = localStorage.getItem("name") || "Anonymous";
  const scrollRef = useRef(null);

  useEffect(() => {
    socket.on("receivePublicMessage", (msg) => {
      setMessages((prev) => [...prev, { ...msg, timestamp: new Date().toISOString() }]);
    });
    return () => socket.off("receivePublicMessage");
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("sendPublicMessage", { user, text: input });
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">🌾 Farm Chat Room</h2>

      <ScrollArea className="border h-96 rounded-lg p-4 overflow-y-scroll" ref={scrollRef}>
        <div className="flex flex-col gap-3">
          {messages.map((m, i) => {
            const isSelf = m.user === user;
            return (
              <div key={i} className={`flex items-start gap-2 ${isSelf ? "justify-end" : "justify-start"}`}>
                {!isSelf && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={m.avatar || "/placeholder.jpg"} />
                    <AvatarFallback>{m.user?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-lg px-4 py-2 max-w-xs text-sm shadow ${isSelf ? "bg-green-100 text-right" : "bg-gray-200"}`}>
                  <p className="font-semibold">{isSelf ? "You" : m.user}</p>
                  <p className="break-words">{m.text}</p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="flex items-center gap-2 mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={sendMessage} className="bg-green-600 text-white">
          Send
        </Button>
      </div>
    </div>
  );
}
