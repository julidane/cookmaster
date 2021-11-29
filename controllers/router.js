const express = require('express');

const router = express.Router({ mergeParams: true });

const { registerUsers } = require('./UsersController');

router.post('/users', registerUsers);

module.exports = router;