const { MongoClient } = require('mongodb');

const databaseConfiguration = {
    /**
     * Connection URI for the local MongoDB instance, running on the default port.
     * See https://www.mongodb.com/docs/v6.2/reference/connection-string/ for more details.
     */
    uri: 'mongodb://localhost:27017/',

    /**
     * Database and collection names. Replace with your own database and collection names.
     */
    databaseName: 'my_database',
    collectionName: 'users'
}

async function main() {
    /**
     * The MongoDB client instance to connect and interact with the database. 
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details.
     */
    const client = new MongoClient(databaseConfiguration.uri, {
        /**
         * Specify the Server API version for long-term API stability.
         * See https://www.mongodb.com/docs/manual/reference/stable-api/
         */
        serverApi: { version: '1' }
    });

    try {
        await client.connect();
        const db = client.db(databaseConfiguration.databaseName);

        /**
         * Create a collection with a validator to enforce data integrity.
         * Schema validation is applied by the database server and is optional when creating a collection.
         * See https://www.mongodb.com/docs/manual/core/schema-validation/ for more details.
         */
        try {
            await db.createCollection(databaseConfiguration.collectionName, {
                validator: {
                    $jsonSchema: {
                        bsonType: 'object',
                        title: 'User Document Validation',
                        required: ['name', 'email'],
                        properties: {
                            name: {
                                bsonType: 'string',
                                description: '\'name\' must be a string and is required'
                            },
                            email: {
                                bsonType: 'string',
                                pattern: '^.+@.+$',
                                description: '\'email\' must be a valid email address and is required'
                            },
                            age: {
                                bsonType: 'int',
                                minimum: 0,
                                description: '\'age\' must be a non-negative integer if the field exists'
                            }
                        }
                    }
                }
            });
        } catch (error) {
            if (error?.codeName === 'NamespaceExists') {
                // Do nothing. The collection has already been created.
            }
        }

        const collection = db.collection(databaseConfiguration.collectionName);

        // Insert documents into the collection.
        console.log("Inserting documents into the collection..");
        await collection.insertMany([
            { name: 'John Doe', email: 'john.doe@example.com', age: 30 },
            { name: 'Jane Doe', email: 'jane.doe@example.com', age: 25 },
            { name: 'Peter Pan', email: 'peter.pan@example.com', age: 10 }
        ]);

        // Build an unique index on the email field to prevent duplicate email addresses
        // and improve query performance for email-based searches
        await collection.createIndex({ email: 1 }, { unique: true });

        // Find documents with the email 'john.doe@example.com'
        const query = { email: 'john.doe@example.com' };
        const result = await collection.find(query).toArray();

        console.log('Documents with email \'john.doe@example.com\':');
        console.log(result);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
