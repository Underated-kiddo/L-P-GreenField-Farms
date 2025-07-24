const { Server } = require("socket.io");

let onlineUsers = new Map();

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("addUser", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("getUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const receiverSocket = onlineUsers.get(receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", {
          senderId,
          text,
          timestamp: new Date(),
        });
      }
    });

    socket.on("typing", ({ to }) => {
      const receiverSocket = onlineUsers.get(to);
      if (receiverSocket) io.to(receiverSocket).emit("typing");
    });

    socket.on("stopTyping", ({ to }) => {
      const receiverSocket = onlineUsers.get(to);
      if (receiverSocket) io.to(receiverSocket).emit("stopTyping");
    });

    socket.on("disconnect", () => {
      for (const [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("getUsers", Array.from(onlineUsers.keys()));
      console.log("🔴 Disconnected:", socket.id);
    });
  });
};

module.exports = initSocket;
