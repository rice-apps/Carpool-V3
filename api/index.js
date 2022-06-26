const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
server.start().then((res) => {
  server.applyMiddleware({ app });

  const url =
    "mongodb+srv://tigerking:wphPpplcHRwNdv29@riceapps2020-21-ppsrv.gcp.mongodb.net/osa_2022?retryWrites=true&w=majority";
  mongoose.connect(url);
  mongoose.connection.on("connected", function () {
    console.log("Mongoose connected");
    // console.log("Mongoose connected to " + url);
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
