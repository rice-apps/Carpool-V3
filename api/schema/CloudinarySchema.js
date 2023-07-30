const { gql } = require("apollo-server");
const config = require("../config");
const cloudinary = require("cloudinary").v2;
import { makeExecutableSchema } from "apollo-server-express";
const apiSecret = cloudinary.config().api_secret;

const typeDefs = gql`
  type SignatureForm {
    signature: String!
    timestamp: Int!
    cloudname: String!
    folder: String!
    apikey: String!
  }
  type Query {
    signature(publicId: String, timestamp: Int, folder: String): SignatureForm
  }
`;

//calculates the signature for this uploaded picture based on timestamp and signature
const calcCurrSignature = (publicId, timestamp, folder) => {
  const signature = cloudinary.utils.api_sign_request(
    {
      //params_to_sign
      timestamp: timestamp,
      folder: folder,
      overwrite: true,
      public_id: publicId,
    },
    apiSecret
  );
  return {
    timestamp: timestamp,
    signature: signature,
    cloudname: config.CLOUDINARY_NAME,
    apikey: config.CLOUDINARY_API_KEY,
    folder: folder,
  };
};

const resolvers = {
  Query: {
    signature(ob, args, context, info) {
      return calcCurrSignature(args.publicId, args.timestamp, args.folder);
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };