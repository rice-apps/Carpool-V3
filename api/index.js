var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');
import { Ride } from './models';
import http from 'http';

// var path = require('path');
// var cookieParser = require('cookie-parser');
var exjwt = require('express-jwt');
var cors = require('cors')

// Import hidden values from .env
import { PORT, SECRET, MONGODB_CONNECTION_STRING } from './config';

// Apollo Imports
import Schema from './schema';

/**
 * Import a custom route (non-GraphQL) like so:
 */
// var customRouter = require('./routes/custom');

/**
 * Setup Apollo
 * @param schema: The schema containing the type definitions & resolvers
 * @param context: This is used to pass the decoded JWT object (passed in the header) to the GraphQL functions
 */
const server = new ApolloServer({ 
    schema: Schema,
    context: async ({ req }) => {
      // Gets the decoded jwt object which our exjwt (below) creates for us as req.user
      // Inspiration from: https://www.apollographql.com/blog/setting-up-authentication-and-authorization-with-apollo-federation
      const decodedJWT = req.user || null;
      // const user = await getUserFromToken(token);
      return { decodedJWT };
    }
});

// Initiate express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Apply cors for dev purposes
app.use(cors({
    //Set CORS options here
    origin: "https://carpool.riceapps.org"
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  if (req.headers.origin) {
      console.log(req.headers.origin)
      res.header('Access-Control-Allow-Credentials', true)
      res.header('Access-Control-Allow-Headers', '*')
      res.header('Access-Control-Allow-Methods', '*')
      res.header('Access-Control-Allow-Origin', 'https://carpool.riceapps.org')
      if (req.method === 'OPTIONS') return res.sendStatus(200);
  }
  next()
})

// Add JWT so that it is AVAILABLE; does NOT protect all routes (nor do we want it to)
// Inspiration from: https://www.apollographql.com/blog/setting-up-authentication-and-authorization-with-apollo-federation
app.use(exjwt({
  secret: SECRET, 
  credentialsRequired: false 
}));

function getRides(req, res) {
  return (async () => {
      const connector = mongoose.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
      await (connector.then(()=> {
          Ride.find({
              departureDate: {
                $gte: new Date(), 
                $lt: new Date(8640000000000000)
              }
          }).populate({path: 'departureLocation'}).populate({path: 'arrivalLocation'}).sort({departureDate: -1}).exec(function(err, result) {
              if (err || !result) {
                  console.log(err)
                  res.sendStatus(401)
                  return
              }
              let msg = {rides: result};
              res.send(msg);
          })
      }));
  })();
}

app.get('/getRides', getRides)

// This connects apollo with express
server.applyMiddleware({ app });

// Error handler
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

// Need to call httpServer.listen instead of app.listen so that the WebSockets (subscriptions) server runs
app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});