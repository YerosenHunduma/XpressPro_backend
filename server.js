import express from 'express';
import cor from 'cors';
import router from './routes/index.js';
import databaseConnection from './config/dbConfig.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Enable CORS
app.use(cor());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api', router);

// Start server after database connection
databaseConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error.message);
    });
