const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { Database, applySchemaValidation } = require('./database');
const { databaseConfiguration, serverConfiguration } = require('./config');

/**
 * Initialize the database connection and start the server.
 * This code connects to the MongoDB database, applies schema validation to the 'users' collection,
 * sets up the Express server, defines routes for the 'users' collection, and starts the server.
 * 
 * @param {string} uri - The connection URI for the MongoDB database.
 * @param {string} databaseName - The name of the database.
 * @param {string} collectionName - The name of the collection.
 * @param {object} usersCollectionSchema - The schema for the 'users' collection.
 */
const { uri, databaseName, collectionName, usersCollectionSchema } = databaseConfiguration;
const { port } = serverConfiguration;

Database.connectToDatabase(uri).then(async databaseClient => {
  const db = databaseClient.db(databaseName);
  await applySchemaValidation(db, collectionName, usersCollectionSchema);

  const app = express();
  // Set up a middleware to parse JSON data in the request body
  app.use(bodyParser.json());
  app.use(cors());

  // Define routes for the 'users' collection
  const userRoutes = require('./user.routes');
  app.use('/users', userRoutes);

  app.use('/', (_req, res) => res.status(200).send('API v1.0 is running...'));

  // Start the server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
});
