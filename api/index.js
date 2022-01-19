var createError = require('http-errors');
var express = require('express');
const { ApolloServer } = require('apollo-server-express');

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
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var corsOptions = {
  // Set CORS options here
  // origin: "*",
  // credentials: true
}


// Apply cors for dev purposes
app.use(cors(corsOptions))

// Add JWT so that it is AVAILABLE; does NOT protect all routes (nor do we want it to)
// Inspiration from: https://www.apollographql.com/blog/setting-up-authentication-and-authorization-with-apollo-federation
app.use(exjwt({
  secret: SECRET, 
  credentialsRequired: false 
}));

// If we have custom routes, we need these to accept JSON input
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// This creates a route to our custom controller OUTSIDE of GraphQL
// app.use('/api/custom', customRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// This connects apollo with express
// server.applyMiddleware({ app, path: "/graphql", cors: cors(corsOptions) });
server.applyMiddleware({ app });

// Need to call httpServer.listen instead of app.listen so that the WebSockets (subscriptions) server runs
app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});