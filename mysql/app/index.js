const mysql = require('mysql2/promise');
const config = require('./config'); // Assuming you have a config.js file

async function main() {
    // Create a MySQL connection pool
    const pool = mysql.createPool(config.db);

    try {
        // Create 'users' table
        const createUsersTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL
            )
        `;

        await pool.query(createUsersTableQuery);
        console.log('Users table created or already exists');

        // Insert sample data into 'users' table
        const insertUsersQuery = `
            INSERT INTO users (name, email) 
            VALUES 
                ('John Doe', 'john.doe@example.com'),
                ('Jane Smith', 'jane.smith@example.com')
        `;

        try {
            await pool.query(insertUsersQuery);
            console.log('Sample data inserted into users table');
        } catch (error) {
            // Check if the error is a duplicate entry error
            if (error.code === 'ER_DUP_ENTRY') {
                console.log('Sample data already exists in the users table');
            } else {
                // If it's not a duplicate entry error, re-throw it
                throw error;
            }
        }

        // Select all users
        const [results] = await pool.query('SELECT * FROM users');
        console.log('Current data in users table:');
        console.log(results);

    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        // Close the pool
        await pool.end();
    }
}

main().catch(console.error);