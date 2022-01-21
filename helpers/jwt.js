import jwt from "jsonwebtoken";

const generateToken = (id) => {
  const token = jwt.sign({ data: id }, "jwt_token", { expiresIn: "7h" });
  return token;
};

export { generateToken };
