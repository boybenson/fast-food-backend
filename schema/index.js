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
    qtyToBuy: Int
  }

  type Order {
    user: User!
    id: String!
    address: String
    foods: [Food!]!
    totalPrice: Float!
    paymentMethod: String
    isDelivered: Boolean
  }

  # inputs

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

  input OrderContent {
    address: String!
    totalPrice: Float!
    paymentMethod: String
  }

  input OrderedFoodContent {
    name: String!
    price: Float!
    image: String
    category: String
    id: String
    qtyToBuy: Int
  }

  # default types

  type Query {
    getCategory(categoryName: String): [Food]!
    getOrders: [Order]!
    getOrder(orderId: String!): Order!
  }

  type Mutation {
    signUp(phone: String, content: UserContent): User!
    signIn(content: UserContent): User!
    addFood(content: FoodContent): Food!
    createOrder(content: OrderContent, foods: [OrderedFoodContent]): Order!
  }
`;
