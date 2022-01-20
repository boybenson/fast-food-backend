import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    length: 10,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Boolean,
    required: false,
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
