import mongoose from "mongoose";

const connectDb = async () => {
  const connection = await mongoose.connect(
    "mongodb://localhost:27017/fast-food"
  );
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
