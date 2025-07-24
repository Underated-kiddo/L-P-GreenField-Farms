import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Chats = () => {
  const [users, setUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/all"); // ✅ make sure this route exists in backend
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };

    if (showUserList) fetchUsers();
  }, [showUserList]);

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-4">Chats</h1>
      <p>Select a user to chat with.</p>

      {showUserList && (
        <div className="mt-4 space-y-2">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-2 border rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/chatroom/${user._id}`)}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar || "/placeholder.jpg"} />
                <AvatarFallback>{user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating + icon */}
      <Button
        onClick={() => setShowUserList((prev) => !prev)}
        className="rounded-full w-12 h-12 flex items-center justify-center fixed bottom-6 right-6 shadow-lg text-white text-2xl bg-green-600 hover:bg-green-700"
      >
        +
      </Button>
    </div>
  );
};

export default Chats;
