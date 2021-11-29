const statusCodes = require('http-status-codes').StatusCodes;
const service = require('../services/UsersService');

const registerUsers = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await service.registerUsers({ name, email, password });
        const userWithId = {
            name,
            email,
            role: 'user',
            _id: newUser.insertedId,
        };    
        res.status(statusCodes.CREATED).send(userWithId);
    } catch (err) {
        console.log('error user controller', err.message);
        return next(err);
    }
};

module.exports = { registerUsers };