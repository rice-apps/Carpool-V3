import { LocationTC } from '../models';

/**
 * Custom Resolvers
 */


// Using auth middleware for sensitive info: https://github.com/graphql-compose/graphql-compose-mongoose/issues/158
const LocationQuery = {
    locationOne: LocationTC.getResolver('findOne'),
    locationMany: LocationTC.getResolver('findMany'),
};

const LocationMutation = {
    locationCreateOne: LocationTC.getResolver('createOne'),
    locationDeleteOne: LocationTC.getResolver('removeById'),
    // locationUpdateOne: LocationTC.getResolver('updateOne')
    
};

async function authMiddleware(resolve, source, args, context, info) {
    // Without header, throw error
    if (!context.decodedJWT) {
        throw new Error("You need to be logged in.");
    }

    // Pull out unique MongoDB User id (not the netid) from decoded JWT 
    let { id } = context.decodedJWT;

    // Allows a user to only access THEIR user object, while maintaining any other filters/args they might have requested
    return resolve(source, {...args, filter: {...args.filter, _id: id } }, context, info);
}

export { LocationQuery, LocationMutation };