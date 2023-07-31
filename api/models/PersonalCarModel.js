import { composeWithMongoose } from "graphql-compose-mongoose";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

require("../db");

var PersonalCarSchema = new Schema({
    carBrand: String,
    carColor: String,
    carType: String, // Sedan, SUV, convertible, etc.
    licensePlate: String,
});

export const PersonalCar = mongoose.model("personalCars", PersonalCarSchema);
export const PersonalCarTC = composeWithMongoose(PersonalCar);
