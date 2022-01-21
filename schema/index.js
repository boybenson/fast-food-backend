import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: String!
    email: String!
    phone: String!
    role: String!
    accessToken: String!
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

  input UserContent {
    email: String!
    password: String!
  }

  type Query {
    getUsers: [User]!
    getUser: User
    getOrders: [Order]!
  }

  type Mutation {
    signUp(phone: String, content: UserContent): User!
    signIn(content: UserContent): User!
  }
`;
