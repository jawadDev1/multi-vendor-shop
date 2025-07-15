import { SOCKET_URL } from "@/constants";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/types/socket";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      autoConnect: true,
      transports: ["websocket"],
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket is disconnected");
      setIsConnected(false);
    });

    socket.on("error_message", (message) => {
      console.log("Socket error ======> ", message);
      setIsConnected(false);
    });

    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket: socketRef.current, isConnected };
};

export default useSocket;
