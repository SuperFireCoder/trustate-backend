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
        return res.status(err.statusCode).json({ status: 'error', message: err.message });
    }
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Something went wrong!' });
};