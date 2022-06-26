import { gql } from "apollo-server-express";

export const typeDefs = gql`
  #document type
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    hello: String!
    findAllBooks: [Book!]!
  }

  type Mutation {
    createBook(title: String!, author: String!): Book!
    deleteBook(id: ID!): Book!
  }
`;
