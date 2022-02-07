import dotenv from "dotenv";
dotenv.config();
import { ApolloError } from "apollo-server-errors";
import userModel from "../models/userModel.js";
import { generateToken } from "../helpers/jwt.js";
import { comparePassword, hashPassword } from "../helpers/password.js";
import twilio from "twilio";
const smsClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const SIGN_UP = async (_, args) => {
  const { email, password } = args.content;
  const { phone } = args;

  const user = await userModel.findOne({ email }).select("-password");

  if (user) {
    throw new ApolloError("User Already Exists!", "409");
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
    delete newUser.password;
    smsClient.messages
      .create({
        // body: "Hi!, Congrats! for signin up,🎉🎉🎉 Enjoy The Most Delicious Meals In The World With Amazing Prices!🍔🍜🍳",
        body: "test body",
        from: "+19036229603",
        // to: `+233${newUser?.phone?.slice(1)}`,
        to: "+233546949655",
      })
      .then((message) => console.log(message.sid));
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
