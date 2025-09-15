require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { Database, applySchemaValidation } = require('./database');
const { databaseConfiguration, serverConfiguration } = require('./config');

const { uri, databaseName, collectionName, usersCollectionSchema } = databaseConfiguration;
const { port } = serverConfiguration;

Database.connectToDatabase(uri).then(async databaseClient => {
  const db = databaseClient.db(databaseName);
  await applySchemaValidation(db, collectionName, usersCollectionSchema);

  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  const userRoutes = require('./user.routes');
  app.use('/users', userRoutes);

  app.use('/', (_req, res) => res.status(200).send('API v1.0 is running...'));

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}).catch(error => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
});
