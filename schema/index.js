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
    id: String
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

  input FoodContent {
    name: String!
    description: String
    price: Float!
    image: String!
    category: String!
    cookingDuration: Int
  }

  type Query {
    getUsers: [User]!
    getUser: User
    getCategory(categoryName: String): [Food]!
    getOrders: [Order]!
  }

  type Mutation {
    signUp(phone: String, content: UserContent): User!
    signIn(content: UserContent): User!
    addFood(content: FoodContent): Food!
  }
`;
