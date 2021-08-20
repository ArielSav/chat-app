import { io } from "socket.io-client";

const socket = io("http://localhost:5000/");

socket.on("connection", () => {
  console.log(`client connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("client disconnect");
  });
});

export { socket };
