import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({});

const generateToken = (id) => {
  const token = jwt.sign({ data: id }, process.env.JWT_SECRET, {
    expiresIn: "7h",
  });
  return token;
};

const verifyToken = (token) => {
  const result = jwt.verify(token, process.env.JWT_SECRET);
  return result;
};

export { generateToken, verifyToken };
