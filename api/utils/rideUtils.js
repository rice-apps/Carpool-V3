import { Ride } from "../models"

export const isRideFull = async (rideID) => {
    const ride = await Ride.findById(rideID);

    // Check that ride exists
    if (!ride) {
        throw Error("Ride doesn't exist!");
    }

    if (ride.spots == ride.riders.length) {
        // If the number of riders = number of spots, then the ride is full
        return true;
    }
    return false;
}