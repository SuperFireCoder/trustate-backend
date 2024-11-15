import logger from '../logging/logger.js';

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const handleError = (err, res) => {
    if (err.isOperational) {
        logger.warn(`Operational error: ${err.message}`);
        return res.status(err.statusCode).json({ status: 'error', message: err.message });
    }

    logger.error(`Unexpected error: ${err.message}`);
    return res.status(500).json({ status: 'error', message: 'Something went wrong!' });
};