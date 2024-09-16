import { composeWithMongoose } from 'graphql-compose-mongoose';
import { User } from '.';

var mongoose = require('mongoose')
    , Schema = mongoose.Schema

require('../db')

var MessageSchema = new Schema({
    
    to: String,
    message: String,
    from: String

});

export const Message = mongoose.model("messages", MessageSchema);
export const MessageTC = composeWithMongoose(Message);