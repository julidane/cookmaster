const express = require('express');

const router = express.Router({ mergeParams: true });

const { registerUsers, userLogin } = require('./UsersController');
const { registerRecipes, getAllRecipes } = require('./RecipesController');
const validateJWT = require('../api/auth/validateJWT');

router.post('/users', registerUsers);
router.post('/login', userLogin);
router.post('/recipes', validateJWT, registerRecipes);
router.get('/recipes', getAllRecipes);

module.exports = router;