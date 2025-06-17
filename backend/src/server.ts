import { app } from "#app.js";
import { connect_db } from "#db/index.js";
import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "PRODUCTION") dotenv.config();

const PORT: number = parseInt(process.env.PORT ?? "8001");

// handle Exception
process.on("uncaughtException", (error: Error) => {
  console.log("Error :: ", error?.message);
  console.log("Shutting down the server");
  process.exit(1);
});

const server = app.listen(PORT, async () => {
  await connect_db();
  console.log(`Server is running at port:`, PORT);
});

// handle Promise rejection
process.on("unhandledRejection", (error) => {
  console.log("Error :: ", error);
  console.log("Server is shutting down!!!");

  server.close(() => {
    process.exit(1);
  });
});
