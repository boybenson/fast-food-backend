import jwt from "jsonwebtoken";

const generateToken = (id) => {
  const token = jwt.sign({ data: id }, "jwt_token", { expiresIn: "7h" });
  return token;
};

const verifyToken = (token) => {
  const result = jwt.verify(token, "jwt_token");
  return result;
};

export { generateToken, verifyToken };
