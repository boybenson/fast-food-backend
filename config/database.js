import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({});

const connectDb = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  if (connection) {
    console.log(
      `database is connected on ${connection.connections[0].host}:${connection.connections[0].port}`
    );
    return true;
  } else {
    return false;
  }
};

export default connectDb;
