import { ApolloError } from "apollo-server-errors";
import userModel from "../models/userModel.js";
import { generateToken } from "../helpers/jwt.js";
import { hashPassword } from "../helpers/password.js";

const SIGN_UP = async (_, args) => {
  const { email, phone, password } = args.content;

  const user = await userModel.findOne({ email }).select("-password");

  if (user) {
    throw new ApolloError("USER ALREADY EXIST!", "409");
  } else {
    const hashedPassword = await hashPassword(password);
    const newUser = await userModel.create({
      email,
      phone,
      password: hashedPassword,
    });

    const accessToken = generateToken(newUser._id);
    newUser.accessToken = accessToken;
    newUser.id = newUser._id;

    return newUser;
  }
};

export { SIGN_UP };
