import mongoose from "mongoose";

export const connect_db = async () => {
  try {
    const uri = process.env.DB_URL!;

    mongoose.connection.on("connected", () => {
      console.log("Connected to DB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    await mongoose.connect(uri);
  } catch (error) {
    console.log("Error connecting to database :: ", error);
  }
};
