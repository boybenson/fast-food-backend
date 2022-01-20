import { ApolloServer, gql } from "apollo-server";
import dotenv from "dotenv";
dotenv.config();

import connectDb from "./config/database.js";
import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schema/index.js";

const server = new ApolloServer({ typeDefs, resolvers });

const dbConnection = await connectDb();

if (dbConnection) {
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
} else {
  console.log(`error connecting to database`);
}
