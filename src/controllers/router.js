const express = require('express');

const router = express.Router({ mergeParams: true });

const { registerUsers, userLogin } = require('./UsersController');
const { registerRecipes } = require('./RecipesController');
const validateJWT = require('../api/auth/validateJWT');

router.post('/users', registerUsers);
router.post('/login', userLogin);
router.post('/recipes', validateJWT, registerRecipes);

module.exports = router;