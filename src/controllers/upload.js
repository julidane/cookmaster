const statusCodes = require('http-status-codes');

const uploadController = (req, res, next) => {
    try {
        if (req.file) {
            console.log('Arquivo chegou');
            res.status(statusCodes.OK).send({});
        }
    } catch (err) {
        console.log('uploadController error', err.message);
        return next(err);
    }
    next();
};

module.exports = uploadController;