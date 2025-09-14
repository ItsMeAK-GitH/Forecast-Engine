const mongodb = require('mongodb');

class Database {
    static connection;

    static async connectToDatabase(uri) {
        if (!Database.connection) {
            const client = new mongodb.MongoClient(uri);
            Database.connection = await client.connect();
        }

        return Database.connection;
    }
}

async function applySchemaValidation(db, collectionName, schema) {
    await db.command({
        collMod: collectionName,
        validator: schema
    }).catch(async error => {
        if (error?.codeName === 'NamespaceNotFound') {
            await db.createCollection(collectionName, {
                validator: schema
            });
        }
    });
}

module.exports = {
    Database,
    applySchemaValidation
};
