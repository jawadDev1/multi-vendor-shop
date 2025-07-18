import { onChatConnection } from "#events/chat.event.js";
import { Server } from "socket.io";

export const configureSocket = (io: Server) => {
  io.on("connection", (socket) => {
  
    onChatConnection(socket, io);
  });
};
