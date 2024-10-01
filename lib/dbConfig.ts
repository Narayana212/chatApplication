import mongoose from 'mongoose';

```
/**
 * Establishes a connection to MongoDB using Mongoose.
 * @returns {Promise<void>} A promise that resolves when the connection is established successfully, or rejects if an error occurs.
 */

```export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        /**
         * Sets up an event listener for the 'connected' event on a MongoDB connection
         * @param {function} callback - A callback function that logs a success message when the connection is established
         * @returns {void} This method does not return a value
         */
        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        /**
         * Handles MongoDB connection errors
         * @param {Error} err - The error object containing details about the connection error
         * @returns {void} This function doesn't return anything, but it logs the error and exits the process
         */
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}