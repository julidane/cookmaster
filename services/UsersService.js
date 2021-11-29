const Joi = require('joi');
const statusCodes = require('http-status-codes');
const users = require('../models/UsersModel');

const invalidEntries = 'Invalid entries. Try again.';
const registeredEmail = 'Email already registered';

const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const validateError = (status, message) => ({
    status, 
    message,
});

const registerUsers = async ({ name, email, password }) => {
    const { error } = UserSchema.validate({ name, email, password });
    if (error) throw validateError(statusCodes.BAD_REQUEST, invalidEntries);

    const checkEmail = await users.checkUserEmail(email);
    if (checkEmail) throw validateError(statusCodes.CONFLICT, registeredEmail);

    const newUser = users.registerUsers({ name, email, password });
    return newUser;
};
module.exports = { registerUsers };