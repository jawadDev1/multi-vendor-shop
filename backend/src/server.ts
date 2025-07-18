import { app } from "#app.js";
import { configureSocket } from "#config/socket.js";
import { connect_db } from "#db/index.js";
import * as dotenv from "dotenv";
import http from "node:http";
import { Server } from "socket.io";

if (process.env.NODE_ENV !== "PRODUCTION") dotenv.config();

const PORT: number = parseInt(process.env.PORT ?? "8001");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    credentials: true,
    origin: process.env.APP_URL!,
  },
});

configureSocket(io);

// handle Exception
process.on("uncaughtException", (error: Error) => {
  console.log("Error :: ", error?.message);
  console.log("Shutting down the server");
  process.exit(1);
});

const server_instance = server.listen(PORT, async () => {
  await connect_db();
  console.log(`Server is running at port:`, PORT);
});

// handle Promise rejection
process.on("unhandledRejection", (error) => {
  console.log("Error :: ", error);
  console.log("Server is shutting down!!!");

  server_instance.close(() => {
    process.exit(1);
  });
});
