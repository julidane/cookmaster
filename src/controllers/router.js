const express = require('express');

const router = express.Router({ mergeParams: true });

const { registerUsers, userLogin } = require('./UsersController');

router.post('/users', registerUsers);
router.post('/login', userLogin);

module.exports = router;