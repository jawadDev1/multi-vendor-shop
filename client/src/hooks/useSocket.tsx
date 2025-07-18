import { SOCKET_URL } from "@/constants";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/types/socket";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketProps {
  email: string;
  conversation_id: string;
}

const useSocket = ({ email, conversation_id }: UseSocketProps) => {
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

    const handleUnload = () => {
      if (socket.connected) {
        socket.emit("remove_user", { userId: email, conversation_id });
        socket.disconnect();
      }
    };

    // For remove user Even if client refresh the page
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      socket.emit("remove_user", { userId: email, conversation_id });
      socket.disconnect();
    };
  }, []);

  return { socket: socketRef.current, isConnected };
};

export default useSocket;
