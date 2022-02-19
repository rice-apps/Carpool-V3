import { SchemaComposer } from "graphql-compose";
import { schema as CloudinarySchema } from "./CloudinarySchema";
import { stitchSchemas } from "@graphql-tools/schema-stitching";

require("../db");

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from "./UserSchema";
import { RideQuery, RideMutation } from "./RideSchema";
import { LocationQuery, LocationMutation } from "./LocationSchema";
import { AuthQuery, AuthMutation } from "./AuthSchema";

schemaComposer.Query.addFields({
  ...UserQuery,
  ...RideQuery,
  ...LocationQuery,
  ...AuthQuery,
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...RideMutation,
  ...LocationMutation,
  ...AuthMutation,
});

schemaComposer.Subscription.addFields({
  // If we have any subscriptions, we just import them in the same way
});

const DbSchema = schemaComposer.buildSchema();

export default stitchSchemas({ subschemas: [DbSchema, CloudinarySchema] });
