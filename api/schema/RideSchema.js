import { UserTC, RideTC, LocationTC, User, Ride, Location } from '../models'
import { isRideFull } from '../utils/rideUtils'
import sgMail from '@sendgrid/mail'
import { Agenda } from 'agenda'

const agenda = new Agenda({ db: { address: process.env.MONGODB_CONNECTION_STRING } });

(async function () {
	// IIFE to give access to async/await
	await agenda.start();
})();

agenda.define('send reminder', async (job) => {
  const ride = await Ride.findById(job.attrs.data.rideID)
  console.log(job.attrs.data.rideID)
  console.log(JSON.stringify(ride))
  console.log(ride)
  console.log(ride.riders)
  console.log(ride == null)
  if (!ride || !ride.owner) {
    console.log("Ride not found")
    return
  }
  await sendMail(ride, { actorID: ride.owner, push: true, templateId: process.env.REMINDER_MAIL_ID, sendAll: true})
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

/**
 * Add relations since the Ride model has ObjectIds (references) for some fields
 */
RideTC.addRelation('owner', {
  resolver: () => UserTC.getResolver('findById'),
  args: UserTC.getInputTypeComposer(),
  prepareArgs: {
    _id: (source) => source.owner,
  },
  projection: { owner: 1 },
})

RideTC.addRelation('riders', {
  resolver: () => UserTC.getResolver('findByIds'),
  args: UserTC.getInputTypeComposer(),
  prepareArgs: {
    _ids: (source) => source.riders,
  },
  projection: { riders: 1 },
})

RideTC.addRelation('departureLocation', {
  resolver: () => LocationTC.getResolver('findById'),
  args: LocationTC.getInputTypeComposer(),
  prepareArgs: {
    _id: (source) => source.departureLocation,
  },
  projection: { departureLocation: 1 },
})

RideTC.addRelation('arrivalLocation', {
  resolver: () => LocationTC.getResolver('findById'),
  args: LocationTC.getInputTypeComposer(),
  prepareArgs: {
    _id: (source) => source.arrivalLocation,
  },
  projection: { arrivalLocation: 1 },
})

/**
 * Custom Resolvers
 */
RideTC.addResolver({
  name: 'findByUser',
  type: [RideTC],
  resolve: async ({ source, args, context, info }) => {
    const { id } = context.decodedJWT
    // Return all rides where the user is an owner or a rider
    return await Ride.find({
      $or: [{ owner: id }, { riders: { $in: [id] } }],
    })
  },
})

/**
 * Used to update the draft sessions for a schedule
 * Can either add or remove a session from their draft sessions
 */
RideTC.addResolver({
  name: 'updateRiders',
  type: RideTC,
  // day is an enum, so we want to get its enum from the model directly
  args: { rideID: 'ID!', push: 'Boolean' },
  resolve: async ({ source, args, context, info }) => {
    // Check that there are still spots left on the requested ride
    let isFull = await isRideFull(args.rideID)
    if (isFull && args.push) {
      throw Error('Sorry, this ride is already full.')
    }

    // Get the user we want to add/remove from the list from the request
    let { id } = context.decodedJWT

    // This determines whether we add or remove from the array
    let operation = args.push ? '$addToSet' : '$pull' // $addToSet automatically checks if the rider already exists for us, so we don't need to worry about duplicates :)

    // Setup update based on operation
    let update = {}
    update[operation] = { riders: id }

    // Execute update
    let updatedRide = await Ride.findByIdAndUpdate(
      args.rideID,
      update,
      { new: true } // we want to return the updated ride
    )

    await sendMail(updatedRide, {actorID: id, push: args.push, templateId: process.env.UPDATE_MAIL_ID, sendAll: true})

    return updatedRide
  },
})

// Using auth middleware for sensitive info: https://github.com/graphql-compose/graphql-compose-mongoose/issues/158
const RideQuery = {
  rideOne: RideTC.getResolver('findOne'),
  rideMany: RideTC.getResolver('findMany'),
  rideByUser: RideTC.getResolver('findByUser'),
}

// TODO: Add [authMiddleware] back to all getResolver calls once login is implemented!
const RideMutation = {
  rideCreateOne: RideTC.getResolver('createOne', [authMiddleware]).wrapResolve((next)=> async (rp) => {
    const result = await next(rp)
    Ride.findById(result.recordId).then((ride) => {
      // Schedule using agenda
      const date = (new Date(result.record.departureDate))
      date.setHours(date.getHours() - 1)
      agenda.schedule(date, 'send reminder', {rideID: result.recordId})
    })
    return result;
  }), // only a registered user can create a ride
  rideUpdateOne: RideTC.getResolver('updateOne'), // only a registered user can edit the ride completely
  rideDeleteOne: RideTC.getResolver('removeById', [authMiddleware]), // only the user who OWNS the ride can delete it
  addRider: RideTC.getResolver('updateRiders', [authMiddleware]).wrapResolve((next) => (rp) => {
    rp.args.push = true // we want to add a rider
    return next(rp)
  }),
  removeRider: RideTC.getResolver('updateRiders', [authMiddleware]).wrapResolve(
    (next) => (rp) => {
      rp.args.push = false // we want to remove a rider
      return next(rp)
    }
  ),
}

async function sendMail(updatedRide, args) {
  console.log(JSON.stringify(updatedRide))
  const owner = await User.findById(updatedRide.owner)
  const user = await User.findById(args.actorID)

  const departure = await Location.findById(updatedRide.departureLocation)
  const arrival = await Location.findById(updatedRide.arrivalLocation)
  // We want a date in the format of "Day, Month Date, Time" (e.g. "Monday, January 1, 12:00 PM")
  const date = new Date(updatedRide.departureDate)
  const dateFormatted = date.toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }) + " CST"
  const templateData = {
    "ride": {
      "owner": {
        "firstName": owner.firstName,
        "lastName": owner.lastName,
        "netID": owner.netid
      },
      "departureLocation": {
        "title": departure.title,
        "address": departure.address
      },
      "arrivalLocation": {
        "title": arrival.title,
        "address": arrival.address
      },
      "notes": updatedRide.notes,
      "riders": updatedRide.riders.filter(rider=>rider.neid != owner.netid).map(rider => {
        return {
          "firstName": rider.firstName,
          "lastName": rider.lastName,
          "netID": rider.netid
        }
      }),
      "time": dateFormatted
    },
    "recipient": {
      "firstName": owner.firstName,
      "lastName": owner.lastName,
      "netID": owner.netid
    },
    "join": args.push,
    "actor": {
      "firstName": user.firstName,
      "lastName": user.lastName,
      "netID": user.netid
    }
  }

  if (args.sendAll) {
    for (const rider of updatedRide.riders) {
      sendToNetId(rider.netid, args.templateId, templateData);
    }
  } else {
    sendToNetId(owner.netid, args.templateId, templateData);
  }
}

function sendToNetId(netId, templateId, templateData) {
  const msg = {
    to: `${netId}@rice.edu`,
    from: 'carpool@riceapps.org',
    templateId: templateId,
    dynamicTemplateData: templateData
  };
  sgMail.send(msg).then(() => { console.log("Sent mail to ", msg.to); }, error => {
    console.error("Issue with sending email", error);

    if (error.response) {
      console.error(error.response.body);
    }
  });
}

async function authMiddleware(resolve, source, args, context, info) {
  // Without header, throw error
  if (!context.decodedJWT) {
    throw new Error('You need to be logged in.')
  }

  // Pull out unique MongoDB User id (not the netid) from decoded JWT
  let { id } = context.decodedJWT

  // Allows a user to only access THEIR user object, while maintaining any other filters/args they might have requested
  return resolve(
    source,
    { ...args, filter: { ...args.filter, _id: id } },
    context,
    info
  )
}

export { RideQuery, RideMutation }
