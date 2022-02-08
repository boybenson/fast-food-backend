import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { ApolloError } from "apollo-server-errors";
import userModel from "../models/userModel.js";
import { generateToken } from "../helpers/jwt.js";
import { comparePassword, hashPassword } from "../helpers/password.js";

const SIGN_UP = async (_, args) => {
  const { email, password } = args.content;
  const { phone } = args;

  const user = await userModel.findOne({ email });

  if (user) {
    throw new ApolloError("User Already Exists!", "409");
  } else {
    const hashedPassword = await hashPassword(password);
    const newUser = await userModel.create({
      email,
      phone,
      password: hashedPassword,
    });

    const axiosConfig = {
      method: "post",
      url: "https://sms.arkesel.com/api/v2/sms/send",
      headers: {
        "api-key": process.env.SMS_API_KEY,
      },
      data: {
        sender: "FAST FOOD",
        message:
          "Hi!, Congrats! for signing up, Enjoy The Most Delicious Meals In The World With Amazing Prices!",
        recipients: [`233${newUser?.phone?.slice(1)}`],
      },
    };

    const accessToken = generateToken(newUser._id);
    newUser.accessToken = accessToken;
    newUser.id = newUser._id;
    delete newUser.password;
    await axios(axiosConfig);
    return newUser;
  }
};

const SIGN_IN = async (_, args) => {
  const { email, password } = args.content;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new ApolloError("Invalid Email Address", "403");
  } else {
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      throw new ApolloError("Incorrect Password", 403);
    } else {
      const accessToken = generateToken(user._id);
      user.accessToken = accessToken;
      user.id = user._id;
      delete user.password;
      return user;
    }
  }
};

export { SIGN_UP, SIGN_IN };
