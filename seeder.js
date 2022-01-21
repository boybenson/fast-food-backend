import userModel from "./models/userModel.js";
import connectDb from "./config/database.js";
import bcrypt from "bcrypt";

const email = "leslie@gmail.com";
const contact = "0242111189";
const password = "hashedPassword";
const role = "customer";

await connectDb();

const saveUser = async () => {
  const user = await userModel.create({
    email,
    contact,
    password,
    role,
  });

  return user;
};

console.log(saveUser());
