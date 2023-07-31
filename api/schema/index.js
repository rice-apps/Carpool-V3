import { SchemaComposer } from "graphql-compose";

require("../db");

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from "./UserSchema";
import { RideQuery, RideMutation } from "./RideSchema";
import { LocationQuery, LocationMutation } from "./LocationSchema";
import { AuthQuery, AuthMutation } from "./AuthSchema";
import { PersonalCarMutation } from "./PersonalCarSchema";

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
    ...PersonalCarMutation,
});

schemaComposer.Subscription.addFields({
    // If we have any subscriptions, we just import them in the same way
});

export default schemaComposer.buildSchema();
