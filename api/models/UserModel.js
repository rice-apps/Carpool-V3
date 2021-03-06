import { composeWithMongoose } from "graphql-compose-mongoose";

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

require("../db");

var UserSchema = new Schema({
  netid: { type: String, required: true, unique: true }, // This will be our unique identifier across systems
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  college: { type: String, default: "" },
  phone: { type: String, default: "" },
  venmo: { type: String, default: "" },
  token: { type: String, default: "" }, // We will use this to store the user's JWT token
  recentUpdate: { type: Boolean, default: false }, // this field used for displaying banners/modals on version updates of our app
});

export const User = mongoose.model("users", UserSchema);
export const UserTC = composeWithMongoose(User);
