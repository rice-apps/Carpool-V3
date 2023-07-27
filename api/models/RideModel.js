import { composeWithMongoose } from 'graphql-compose-mongoose';
import { User } from './UserModel';
import { Location } from './LocationModel';

var mongoose = require('mongoose')
    , Schema = mongoose.Schema

require('../db')

var RideSchema = new Schema({
    departureDate: { type: Date, default: Date.now(), index: true },
    departureLocation: { type: Schema.Types.ObjectId, ref: Location, required: true },
    arrivalLocation: { type: Schema.Types.ObjectId, ref: Location, required: true },
    owner: { type: Schema.Types.ObjectId, ref: User, required: true },
    riders: [ { type: Schema.Types.ObjectId, ref: User } ],
    notes: String, // notes section for personal message from ride creator
    spots: { type: Number, default: 3 },
    typeofcar: String,
    receipt: {type: Buffer}
    //cost: { type: Number },
    //ownerDriving: { type: Boolean, default: false },
});

export const Ride = mongoose.model("rides", RideSchema);
export const RideTC = composeWithMongoose(Ride);