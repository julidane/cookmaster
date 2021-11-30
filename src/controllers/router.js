const express = require('express');

const router = express.Router({ mergeParams: true });

const { registerUsers, userLogin } = require('./UsersController');
const { registerRecipes, getAllRecipes, getRecipeById, 
    editRecipe, deleteRecipe } = require('./RecipesController');

const validateJWT = require('../api/auth/validateJWT');

router.post('/users', registerUsers);
router.post('/login', userLogin);
router.post('/recipes', validateJWT, registerRecipes);
router.get('/recipes', getAllRecipes);
router.get('/recipes', validateJWT, getAllRecipes);
router.get('/recipes/:id', getRecipeById);
router.get('/recipes/:id', validateJWT, getRecipeById);
router.put('/recipes/:id', validateJWT, editRecipe);
router.delete('/recipes/:id', validateJWT, deleteRecipe);

module.exports = router;