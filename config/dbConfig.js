import mongoose from 'mongoose';

export default function connectDB() {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.Mongo_URI);
        mongoose.connection.on('connected', () => {
            console.log('Connected to database successfully');
            resolve();
        });

        mongoose.connection.on('error', (err) => {
            console.error(`Error connecting to the database: ${err.message}`);
            reject(err);
        });
    });
}
