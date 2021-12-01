const statusCodes = require('http-status-codes').StatusCodes;
const service = require('../services/UsersService');

const registerUsers = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await service.registerUsers(name, email, password);
        const userWithId = { 
            user: {
            name,
            email,
            role: 'user',
            _id: newUser.insertedId,
        }, 
    };    
        res.status(statusCodes.CREATED).send(userWithId);
    } catch (err) {
        console.log('error user controller', err.message);
        return next(err);
    }
};

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userFound = await service.findUser(email, password);
        res.status(statusCodes.OK).send(userFound);
    } catch (err) {
        console.log('error user controller', err.message);
        return next(err);
    }
};

const registerAdmin = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userInfo = req.user;
        const newAdmin = await service.registerAdmin(name, email, password, userInfo);
        const adminWithId =  {
            user: {
                name,
                email,
                role: 'admin',
                _id: newAdmin.insertedId,
            }
        }
        res.status(statusCodes.CREATED).send(adminWithId);
    } catch (err) {
        console.log('error user controller', err.message);
        return next(err);
    }
};

module.exports = { registerUsers, userLogin, registerAdmin };