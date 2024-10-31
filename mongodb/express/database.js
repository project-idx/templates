const mongodb = require('mongodb');

/**
 * Database class for managing the MongoDB connection.
 * This class is a singleton, ensuring only one connection is established.
 */
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

/**
 * Applies schema validation to a collection.
 * If the collection does not exist, it will be created with the provided schema.
 * 
 * @param {*} db 
 * @param {string} collectionName 
 * @param {*} schema 
 */
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
