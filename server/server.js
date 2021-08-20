const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const {
  createChat,
  getChats,
  getChatMessages,
  getSupportChats,
  sendMessage,
} = require("./db");

const app = express();

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("getCustomerChats", async (userName) => {
    const chats = await getChats(userName);
    io.sockets.emit("getChats", chats);
  });
  socket.on("getSupportChats", async () => {
    const chats = await getSupportChats();
    io.sockets.emit("getChats", chats);
  });
  socket.on("getChatMessages", async (chatId) => {
    const messages = await getChatMessages(chatId);
    io.sockets.emit("getMessages", messages);
  });
  socket.on("createChat", async (userName) => {
    const chatId = await createChat(userName);
    io.sockets.emit("chatCreated", chatId);
  });
  socket.on("sendMessage", async (message, chatId, isSenderCustomer) => {
    const updatedDoc = await sendMessage(message, chatId, isSenderCustomer);
    io.sockets.emit("updateChatMessages", chatId);
  });
});

server.listen(5000, () => console.log("Server listening on port 5000"));
