const { Server } = require("socket.io");
const Message = require("./models/messageModel");

let onlineUsers = new Map(); // Map<socketId, userObject>

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    // 🟢 Add user with their full object
    socket.on("addUser", (user) => {
      onlineUsers.set(socket.id, user);
      console.log(`👤 ${user.name} (${user.role}) connected`);
      broadcastOnlineUsers();
    });

    // ✉️ Handle private message sending
    socket.on("sendPrivateMessage", async (msg) => {
      const {
        sender,     // user._id
        receiver,   // user._id
        text,
        user,       // sender name
        emojis = null,
        timestamp = new Date(),
      } = msg;

      const newMessage = new Message({
        sender,
        receiver,
        text,
        user,
      });

      try {
        await newMessage.save();

        const messagePayload = {
          _id: newMessage._id,
          sender,
          receiver,
          text,
          user,
          emojis,
          timestamp,
        };

        // Send to receiver (if online)
        const receiverSocketId = getSocketIdById(receiver);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receivePrivateMessage", messagePayload);
        } else {
          console.log(`⚠️ Receiver ${receiver} is offline`);
        }

        // Send to sender (to reflect immediately)
        socket.emit("receivePrivateMessage", messagePayload);
        socket.emit("messageDelivered", { to: receiver });
      } catch (err) {
        console.error("❌ Message save failed", err);
      }
    });

    // ✏️ Typing indicators
    socket.on("typing", ({ from, to }) => {
      const receiverSocketId = getSocketIdById(to);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", { from });
      }
    });

    socket.on("stopTyping", ({ from, to }) => {
      const receiverSocketId = getSocketIdById(to);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stopTyping", { from });
      }
    });

    // 👁 Seen indicators
    socket.on("seenMessage", ({ from, to }) => {
      const senderSocketId = getSocketIdById(from);
      if (senderSocketId) {
        io.to(senderSocketId).emit("messageSeen", { by: to });
      }
    });

    // 🔌 Disconnect
    socket.on("disconnect", () => {
      const disconnectedUser = onlineUsers.get(socket.id);
      if (disconnectedUser) {
        console.log(`🔴 ${disconnectedUser.name} (${disconnectedUser.role}) disconnected`);
        onlineUsers.delete(socket.id);
        broadcastOnlineUsers();
      }
    });

    // 🔄 Broadcast list
    const broadcastOnlineUsers = () => {
      io.emit("onlineUsers", Array.from(onlineUsers.values()));
    };

    // 🔍 Get socket ID by user _id
    const getSocketIdById = (userId) => {
      for (const [sockId, userObj] of onlineUsers.entries()) {
        if (userObj._id === userId) return sockId;
      }
      return null;
    };
  });
};

module.exports = initSocket;
