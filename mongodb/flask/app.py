from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from pymongo.errors import OperationFailure
from bson import ObjectId
from bson.errors import InvalidId

# Initialize Flask app
app = Flask(__name__)

# Connection URI for the local MongoDB instance, running on the default port.
# See https://www.mongodb.com/docs/v6.2/reference/connection-string/ for more details.
app.config['MONGO_URI'] = 'mongodb://localhost:27017/my_database'

# Initialize PyMongo
mongodb = PyMongo(app)
# Access the 'users' collection
collection = mongodb.db.users

# Sample validation schema for the 'users' collection. Replace with your own collection schemas.
# Schema validation is applied by the database server and is optional when creating a collection.
# See https://www.mongodb.com/docs/manual/core/schema-validation/ for more details.
users_collection_schema = {
    'validator': {
        '$jsonSchema': {
            'bsonType': 'object',
            'title': 'User Document Validation',
            'required': ['name', 'email'],
            'properties': {
                'name': {
                    'bsonType': 'string',
                    'description': "'name' must be a string and is required"
                },
                'email': {
                    'bsonType': 'string',
                    'pattern': '^.+@.+$',
                    'description': "'email' must be a valid email address and is required"
                },
                'age': {
                    'bsonType': 'int',
                    'minimum': 0,
                    'description': "'age' must be a non-negative integer if the field exists"
                }
            }
        }
    }
}

# Check if the 'users' collection exists, and apply schema validation using collMod
try:
    # Try to create the collection if it doesn't exist (without schema validation initially)
    if 'users' not in mongodb.db.list_collection_names():
        mongodb.db.create_collection('users')
        print("Collection 'users' created successfully.")

    # Apply schema validation to the existing 'users' collection using collMod
    mongodb.db.command({
        'collMod': 'users',
        'validator': users_collection_schema['validator']
    })
    print("Schema validation applied to 'users' collection.")

except OperationFailure as e:
    print(f"Error applying schema validation: {e}")
except Exception as general_error:
    print(f"Unexpected error: {general_error}")

def convert_to_objectid(id):
    """
    Tries to convert a string to a valid MongoDB ObjectId.
    
    Parameters:
    id (str): The string to be converted.
    
    Returns:
    ObjectId or None: The converted ObjectId if valid, or None if invalid.
    """
    try:
        return ObjectId(id)
    except InvalidId:
        return None

# Create (POST) - Add a new user
@app.route('/users', methods=['POST'])
def add_user():
    new_user = request.json
    collection.insert_one(new_user)
    return jsonify({"message": "User added successfully!"}), 201

# Read (GET) - Get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = list(collection.find({}, {'_id': False}))  # Fetch all documents without the '_id' field
    return jsonify(users), 200

# Read (GET) - Get a user by ID
@app.route('/users/<user_id>', methods=['GET'])
def get_user_by_id(user_id):
    object_id = convert_to_objectid(user_id)
    if object_id is None:
        return jsonify({"error": "Invalid ID"}), 400

    user = collection.find_one({'_id': object_id}, {'_id': False})
    
    if user is None:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(user), 200


# Read (GET) - Get a user by email
@app.route('/users/email/<email>', methods=['GET'])
def get_user_by_email(email):
    user = collection.find_one({'email': email}, {'_id': False})
    
    if user is None:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(user), 200

# Update (PUT) - Update an existing user by ID
@app.route('/users/<user_id>', methods=['PUT'])
def update_user_by_id(user_id):
    object_id = convert_to_objectid(user_id)
    if object_id is None:
        return jsonify({"error": "Invalid ID"}), 400

    updated_user = request.json
    result = collection.update_one({'_id': object_id}, {'$set': updated_user})
    
    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({"message": "User updated successfully!"}), 200

# Delete (DELETE) - Delete a user by ID
@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user_by_id(user_id):
    object_id = convert_to_objectid(user_id)
    if object_id is None:
        return jsonify({"error": "Invalid ID"}), 400

    result = collection.delete_one({'_id': object_id})
    
    if result.deleted_count == 0:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({"message": "User deleted successfully!"}), 200


if __name__ == '__main__':
    app.run(debug=True)
