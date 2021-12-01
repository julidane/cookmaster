const connection = require('./connection');

const users = 'users';

const checkUserEmail = async (email) => {
    const emailExists = await connection()
    .then((db) => db.collection(users).findOne({ email }));
    return emailExists;
};

const registerUsers = async (name, email, password) => {
    const newUser = await connection()
    .then((db) => db.collection(users).insertOne({ name, email, password }));
    return newUser;
};

const registerAdmin = async (name, email, password) => {
    const newAdmin = await connection().then((db) => db.collection(users).insertOne({ name, email, password }));
    return newAdmin;
}

module.exports = { checkUserEmail, registerUsers, registerAdmin };