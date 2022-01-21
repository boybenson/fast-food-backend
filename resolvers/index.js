import { SIGN_UP } from "../resolvers/auth.js";

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
    getUsers: () => books,
    getUser: () => books,
    getOrders: () => books,
  },
  Mutation: {
    signUp: SIGN_UP,
  },
};
