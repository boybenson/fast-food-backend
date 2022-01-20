import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    email: String!
    contact: Int!
    role: String!
  }

  type Food {
    name: String!
    description: String
    price: Float!
    image: String
    category: String
    cookingDuration: Int
  }

  type Order {
    user: User!
    address: String
    foods: [Food!]!
    totalPrice: Float!
  }

  type Query {
    getUsers: [User]!
    getOrders: [Order]!
  }
`;
