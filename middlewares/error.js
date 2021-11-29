const statusCodes = require('http-status-codes');

const errorMiddleware = (err, _req, res, _next) => {
    console.log(err);

    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        error: {
            message: 'Internal server error',
        },
    });
};

module.exports = errorMiddleware;