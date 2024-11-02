const mongodb = require('mongodb');
const dataGenerator = require('@faker-js/faker');

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
    const client = new mongodb.MongoClient(databaseConfiguration.uri, {
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

        // Generate fictional user data
        const userCount = 5;
        const users = Array.from({ length: userCount}, _ => {
            const firstName = dataGenerator.faker.person.firstName();
            const lastName = dataGenerator.faker.person.lastName();
            const name = `${firstName} ${lastName}`;
            const email = dataGenerator.faker.internet.email({ firstName, lastName });
            const age = dataGenerator.faker.number.int({ min: 0, max: 100 });

            return { name, email, age };
        });

        // Insert the user documents into the collection.
        console.log('Inserting documents into the collection...');
        const result = await collection.insertMany(users);
        console.log(`Inserted ${result.insertedCount} documents into the collection.`);


        // Attempt to build a unique index on the email field to prevent duplicate email addresses
        try {
            await collection.createIndex({ email: 1 }, { unique: true });
        } catch (error) {
            if (error.code === 11000) {
                console.log('Duplicate key error: Email index creation failed due to duplicates.');
            } else {
                throw error;
            }
        }

        // Query the collection for the first fictional user
        const email = users[0].email;
        const query = { email };
        const document = await collection.findOne(query);

        console.log(`Document with email \'${email}\':`);
        console.log(document);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
