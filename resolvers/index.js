import { SIGN_IN, SIGN_UP } from "../resolvers/auth.js";
import { ADD_FOOD, GET_CATEGORY } from "./food.js";
import { CREATE_ORDER } from "./orders.js";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export const resolvers = {
  Query: {
    getOrders: () => books,
    getCategory: GET_CATEGORY,
  },

  Mutation: {
    signUp: SIGN_UP,
    signIn: SIGN_IN,
    addFood: ADD_FOOD,
    createOrder: CREATE_ORDER,
  },
};
