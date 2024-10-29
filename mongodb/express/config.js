module.exports = {
    serverConfiguration: {
        port: 3000,
    },

    databaseConfiguration: {
        /**
         * Connection URI for the local MongoDB instance, running on the default port.
         * See https://www.mongodb.com/docs/v6.2/reference/connection-string/ for more details.
         */
        uri: 'mongodb://localhost:27017/',

        /**
         * Database and collection names. Replace with your own database and collection names.
         */
        databaseName: 'my_database',
        collectionName: 'users',

        /**
         * Sample validation schema for the 'users' collection. Replace with your own collection schemas.
         * Schema validation is applied by the database server and is optional when creating a collection.
         * See https://www.mongodb.com/docs/manual/core/schema-validation/ for more details.
         */
        usersCollectionSchema: {
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
    }
};
