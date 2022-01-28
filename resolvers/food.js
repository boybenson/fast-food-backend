import { ApolloError } from "apollo-server-errors";
import foodModel from "../models/foodModel.js";

const ADD_FOOD = async (_, args, context) => {
  const { user } = context;
  if (!user || (user && user.role !== "admin")) {
    throw new ApolloError("illegal User", "401");
  }
  const newFood = await foodModel.create(args?.content);
  newFood.id = newFood._id;
  return newFood;
};

const GET_CATEGORY = async (_, args) => {
  const { categoryName } = args;
  const foods = await foodModel.find({ category: categoryName });
  return foods;
};

export { ADD_FOOD, GET_CATEGORY };
