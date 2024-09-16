var createError = require('http-errors');
var express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)
import http from 'http';

// var path = require('path');
// var cookieParser = require('cookie-parser');
var exjwt = require('express-jwt');
var cors = require('cors')

// Import hidden values from .env
import { PORT, SECRET } from './config';

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

// Apply cors for dev purposes
app.use(cors({
    // Set CORS options here
    // origin: "*"
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(pino)
// Add JWT so that it is AVAILABLE; does NOT protect all routes (nor do we want it to)
// Inspiration from: https://www.apollographql.com/blog/setting-up-authentication-and-authorization-with-apollo-federation
app.use(exjwt({
  secret: SECRET, 
  credentialsRequired: false 
}));



// This connects apollo with express
server.applyMiddleware({ app });

// If we have custom routes, we need these to accept JSON input
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// This creates a route to our custom controller OUTSIDE of GraphQL
// app.use('/api/custom', customRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.post('/api/messages', (req, res) =>{
  res.header('Content-Type','application/json');

  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      from: req.body.body
    })
    .then(() =>{
      res.send(JSON.stringify({success: true }))
    })
    .catch(err =>{
      console.log(err)
      res.send(JSON.stringify({ success: false }))
    });
});
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

app.post('/', (req, res) => {
  res.send("POST Request Called")
  console.log('callled')
})
// Need to call httpServer.listen instead of app.listen so that the WebSockets (subscriptions) server runs
app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});