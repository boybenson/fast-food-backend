import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const genSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, genSalt);
  return hashedPassword;
};

export { hashPassword };
