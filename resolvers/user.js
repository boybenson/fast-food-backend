import userModel from "../models/userModel.js";

const UPDATE_USER = async (_, args, context) => {
  const { user } = context;
  if (!user) {
    throw new ApolloError("illegal User", "401");
  }
  let { id, email, phone } = args;
};

const GET_USERS = async (_, __, context) => {
  const { user } = context;
  if (user?.role !== "admin") {
    throw new ApolloError("Sorry You Don't Have Admin Priviledges", "401");
  }

  let users = await userModel.find({});
  return users;
};

export { UPDATE_USER, GET_USERS };
