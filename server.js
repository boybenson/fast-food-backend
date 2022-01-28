import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
dotenv.config();

import connectDb from "./config/database.js";
import userModel from "./models/userModel.js";
import { verifyToken } from "./helpers/jwt.js";
import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schema/index.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (req?.headers?.authorization) {
      const accessToken = req?.headers?.authorization?.split(" ")[1];
      let isVerified = verifyToken(accessToken);
      let user = await userModel.findOne({ _id: isVerified.data });
      return { user };
    }
    return {};
  },
});

const dbConnection = await connectDb();

if (dbConnection) {
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
} else {
  console.log(`error connecting to database`);
}
