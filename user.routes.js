const express = require('express');
const mongodb = require('mongodb');

const { Database } = require('./database');
const { databaseConfiguration } = require('./config');
const { getWeather } = require('./services/weather.service');

const { databaseName, collectionName } = databaseConfiguration;
const connection = Database.connection;
const database = connection.db(databaseName);
const collection = database.collection(collectionName);

const router = express.Router();

function toObjectId(stringId) {
    try {
        return mongodb.ObjectId.createFromHexString(stringId);
    } catch (error) {
        console.error(error);
        throw new Error('Invalid ID');
    }
}

// Create (POST) - Add a new user
router.post('/', async (req, res) => {
    const newDocument = req.body;
    let result = await collection.insertOne(newDocument);

    return res.status(201).send(result);
});

// Read (GET) - Get all users
router.get('/', async (_req, res) => {
    const results = await collection.find().toArray();
    return res.status(200).send(results);
});

// Read (GET) - Get a user by ID
router.get('/:id', async (req, res) => {
    const id = req?.params?.id;
    if (!id) {
        return res.status(400).send('\'id\' is required');
    }

    let _id;
    try {
        _id = toObjectId(id);
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const user = await collection.findOne({ _id });
    if (!user) {
        return res.status(404).send('Not found');
    }

    return res.status(200).send(user);
});

// Read (GET) - Get a user's weather by ID
router.get('/:id/weather', async (req, res) => {
    const id = req?.params?.id;
    if (!id) {
        return res.status(400).send('\'id\' is required');
    }

    let _id;
    try {
        _id = toObjectId(id);
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const user = await collection.findOne({ _id });
    if (!user) {
        return res.status(404).send('Not found');
    }

    if (!user.city) {
        return res.status(400).send('User does not have a city');
    }

    try {
        const weather = await getWeather(user.city);
        return res.status(200).send(weather);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});


// Read (GET) - Get a user by email or name
router.get('/query/:query', async (req, res) => {
    const query = req?.params?.query;
    if (!query) {
        return res.status(400).send('\'query\' is required');
    }

    const user = await collection.findOne({ $or: [{ email: query }, { name: query }] });
    if (!user) {
        return res.status(404).send('User not found');
    }

    return res.status(200).json(user);
});

// Update (PUT) - Update an existing user by ID
router.put('/:id', async (req, res) => {
    const id = req?.params?.id;
    const updatedDocument = req.body;

    if (!id || !updatedDocument) {
        return res.status(400).send('Both \'id\' and \'updatedDocument\' are required');
    }

    let _id;
    try {
        _id = toObjectId(id);
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const result = await collection.updateOne(
        { _id },
        { $set: updatedDocument }
    );
    if (result.matchedCount === 0) {
        return res.status(404).send('User not found');
    }

    return res.status(200).send('User updated successfully');
});

// Delete (DELETE) - Delete a user by ID
router.delete("/:id", async (req, res) => {
    const id = req?.params?.id;
    if (!id) {
        return res.status(400).send('\'id\' is required');
    }

    let _id;
    try {
        _id = toObjectId(id);
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const result = await collection.deleteOne({ _id });
    if (result.deletedCount === 0) {
        return res.status(404).send('User not found');
    }

    return res.status(200).send(result);
});

module.exports = router;
