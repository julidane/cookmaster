const express = require('express');

const uploadMiddleware = require('../middlewares/upload');

const router = express.Router({ mergeParams: true });

const { registerUsers, userLogin, registerAdmin } = require('./UsersController');
const { registerRecipes, getAllRecipes, getRecipeById, 
    editRecipe, deleteRecipe, uploadImage } = require('./RecipesController');

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
router.put('/recipes/:id/image/', validateJWT,
 uploadMiddleware.single('image'), uploadImage);
router.post('/users/admin', validateJWT, registerAdmin);

module.exports = router;