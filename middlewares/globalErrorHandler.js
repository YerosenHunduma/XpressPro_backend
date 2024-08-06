import { errorHandler } from '../utils/errorHandler.js';

const globalErrorHandler = (err, req, res, next) => {
    let error = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Internal Server Error'
    };

    if (process.env.NODE_ENV == 'PRODUCTION') {
        response.status(error.statusCode).json(error.message);
    }

    if (process.env.NODE_ENV == 'DEVELOPMENT') {
        res.status(error.statusCode).json({ message: error.message, error: err, stack: err?.stack });
    }
};

export default globalErrorHandler;
