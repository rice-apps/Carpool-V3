import nodemailer from 'nodemailer'
import { UserTC, RideTC, LocationTC, User, Ride, Location } from '../models'
import { isRideFull } from '../utils/rideUtils'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    // TODO: Use OAuth instead 😳
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_EMAIL_PASSWORD,
  },
})

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

    const owner = await User.findById(updatedRide.owner)
    const user = await User.findById(id)

    const departure = await Location.findById(updatedRide.departureLocation)
    const arrival = await Location.findById(updatedRide.arrivalLocation)

    const joinedOrLeft = args.push ? 'joined' : 'left'
    const dateFormatted = updatedRide.departureDate.toDateString()

    const subject = `Rice Carpool: ${user.firstName} ${joinedOrLeft} your ride`
    const plaintextBody = `
      ${user.firstName} ${user.lastName} ${joinedOrLeft} your ${dateFormatted} ride from '${departure.title}' to '${arrival.title}'.\n\nSee <https://carpool.riceapps.org/ridesummary/${updatedRide.id}> for details.
    `.trim()

    const htmlBody = `
      <p>
        <a href="https://carpool.riceapps.org/profile/${user.netid}">${user.firstName} ${user.lastName}</a> ${joinedOrLeft} your ${dateFormatted} ride from '${departure.title}' to '${arrival.title}'.
      </p>

      <p>
        See <a href="https://carpool.riceapps.org/ridesummary/${updatedRide.id}">the ride page</a> for details.
      </p>

      <p>
        <a href="https://carpool.riceapps.org/">
          <img src="https://carpool.riceapps.org/logo.png" alt="Rice Carpool logo" />
        </a>
      </p>
    `

    transporter.sendMail({
      to: `${owner.netid}@rice.edu`,
      subject: subject,
      text: plaintextBody,
      html: htmlBody,
    })

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
  rideCreateOne: RideTC.getResolver('createOne'), // only a registered user can create a ride
  rideUpdateOne: RideTC.getResolver('updateOne'), // only a registered user can edit the ride completely
  rideDeleteOne: RideTC.getResolver('removeById'), // only the user who OWNS the ride can delete it
  addRider: RideTC.getResolver('updateRiders').wrapResolve((next) => (rp) => {
    rp.args.push = true // we want to add a rider
    return next(rp)
  }),
  removeRider: RideTC.getResolver('updateRiders').wrapResolve(
    (next) => (rp) => {
      rp.args.push = false // we want to remove a rider
      console.log("call to removeRider");
      return next(rp)
    }
  ),
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
