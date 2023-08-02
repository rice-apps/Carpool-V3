import { composeWithMongoose } from "graphql-compose-mongoose";
import { User } from ".";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

require("../db");

var LocationSchema = new Schema({
    title: String,
    address: { type: String, unique: true },
});

export const Location = mongoose.model("locations", LocationSchema);
export const LocationTC = composeWithMongoose(Location);
