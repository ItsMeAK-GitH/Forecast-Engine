
// Check if MONGODB_URI environment variable is set
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

const databaseConfiguration = {
    uri: MONGODB_URI,
    databaseName: 'Forecast-API',
    collectionName: 'users',
    usersCollectionSchema: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'email', 'city'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                email: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                    pattern: '^.+@.+$'
                },
                city: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                }
            }
        }
    }
};

const serverConfiguration = {
    port: process.env.PORT || 3000
};

module.exports = {
    databaseConfiguration,
    serverConfiguration
};
