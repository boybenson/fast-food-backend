import { SIGN_IN, SIGN_UP } from "../resolvers/auth.js";
import { ADD_FOOD, GET_CATEGORY } from "./food.js";
import { CREATE_ORDER, GET_ORDER, GET_ORDERS } from "./orders.js";

export const resolvers = {
  Query: {
    getOrders: GET_ORDERS,
    getCategory: GET_CATEGORY,
    getOrder: GET_ORDER,
  },

  Mutation: {
    signUp: SIGN_UP,
    signIn: SIGN_IN,
    addFood: ADD_FOOD,
    createOrder: CREATE_ORDER,
  },
};
