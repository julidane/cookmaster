const Joi = require('joi');
const statusCodes = require('http-status-codes');
const users = require('../models/UsersModel');
const auth = require('./auth');

const invalidEntries = 'Invalid entries. Try again.';
const registeredEmail = 'Email already registered';
const allFields = 'All fields must be filled';
const invalidEmailPassword = 'Incorrect username or password';
const onlyAdmin = 'Only admins can register new admins';

const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const LoginUserSchema = Joi.object({    
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const validateError = (status, message) => ({
    status, 
    message,
});

const registerUsers = async (name, email, password) => {
    const { error } = UserSchema.validate({ name, email, password });
    if (error) throw validateError(statusCodes.BAD_REQUEST, invalidEntries);

    const checkEmail = await users.checkUserEmail(email);
    if (checkEmail) throw validateError(statusCodes.CONFLICT, registeredEmail);

    const newUser = users.registerUsers(name, email, password);
    return newUser;
};

const findUser = async (email, password) => {
    const { error } = LoginUserSchema.validate({ email, password });
    if (error) throw validateError(statusCodes.UNAUTHORIZED, allFields);

    const userFound = await users.checkUserEmail(email);
    if (!userFound) throw validateError(statusCodes.UNAUTHORIZED, invalidEmailPassword);
    
    const { password: _password, ...userWithoutPassword } = userFound;

    const token = auth.genToken(userWithoutPassword);

    return { token };
};

const registerAdmin = (name, email, password, userInfo) => {
    const { role } = userInfo;
    if (role !== 'admin') throw validateError(statusCodes.FORBIDDEN, onlyAdmin);
    const newAdmin = users.registerAdmin(name, email, password);
    return newAdmin;
};

module.exports = { registerUsers, findUser, registerAdmin };