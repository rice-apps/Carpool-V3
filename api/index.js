var createError = require('http-errors');
var express = require('express');
const { ApolloServer } = require('apollo-server-express');
var exjwt = require('express-jwt');
var cors = require('cors')

// Import hidden values from .env
import { PORT, SECRET, REDIS_PORT, REDIS_HOST, REDIS_USERNAME, REDIS_PASSWORD } from './config';

// Apollo Imports
import Schema from './schema';
import bodyParser from 'body-parser'
import graphqlWhitelist, { QueryRepository, MemoryStore, RedisStore } from 'graphql-query-whitelist'

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
const store = new RedisStore({
  port: REDIS_PORT, // Redis port
  host: REDIS_HOST, // Redis host
  username: REDIS_USERNAME, // needs Redis >= 6
  password: REDIS_PASSWORD,
  db: 0, // Defaults to 0
});
const repository = new QueryRepository(store)
const validationErrorFn = (req) => {
  console.log(`Query '${req.operationName} (${req.queryId})' is not in the whitelist`)
  console.log(`Unauthorized query: ${req.body.query}`)

  // Uncomment these to add new queries to whitelist
  repository.put(req.body.query)
  // console.log(store.entries().then(res => console.log(res)))
}

// Apply cors for dev purposes
app.use(cors({
    // Set CORS options here
}))
app.use(bodyParser.json())
// Set dryRun to try for adding queries to whitelist
app.post('/graphql', graphqlWhitelist({ store, validationErrorFn, dryRun: true }))

app.use(function(req, res, next) {
  if (req.headers.origin) {
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

// This connects apollo with express
server.applyMiddleware({ app });

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

// Need to call httpServer.listen instead of app.listen so that the WebSockets (subscriptions) server runs
app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});