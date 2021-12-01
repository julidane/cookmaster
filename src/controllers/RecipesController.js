const statusCodes = require('http-status-codes');
const service = require('../services/RecipesService');

const errorRecipes = 'error recipes controller';

const registerRecipes = async (req, res, next) => {
    try {
        const { name, ingredients, preparation } = req.body;
        const userId = req.user.id;
        const newRecipe = await service.registerRecipes(name, ingredients, preparation);
        const finalRecipe = {
            recipe: {
                name,
                ingredients,
                preparation,
                userId,
                _id: newRecipe.insertedId,
            },
        };
        res.status(statusCodes.CREATED).send(finalRecipe);
    } catch (err) {
        console.log(errorRecipes, err.message);
        return next(err);
    }
};

const getAllRecipes = async (_req, res, next) => {
    try {
        const allRecipes = await service.getAllRecipes();
        res.status(statusCodes.OK).send(allRecipes);
    } catch (err) {
        console.log(errorRecipes, err.message);
        return next(err);
    }
};

const getRecipeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipeById = await service.getRecipeById(id);
        res.status(statusCodes.OK).send(recipeById);
    } catch (err) {
        console.log(errorRecipes, err.message);
        return next(err);
    }    
};

const editRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;        
        const recipeInfos = req.body;
        const editedRecipe = await service.editRecipe(id, recipeInfos, userInfo);
        res.status(statusCodes.OK).send(editedRecipe);
    } catch (err) {
        console.log(errorRecipes, err.message);
        return next(err);
    }
};

const deleteRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        const deletedRecipe = await service.deleteRecipe(id, userInfo);
        res.status(statusCodes.NO_CONTENT).send(deletedRecipe);
    } catch (err) {
        console.log('error recipes controller', err.message);
        return next(err);
    }
};

const uploadImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;        
        const uploadedImage = await service.uploadImage(id, userInfo);
        res.status(statusCodes.OK).send(uploadedImage);
    } catch (err) {
        console.log('error recipes controller', err.message);
        return next(err);
    }
};

module.exports = { 
    registerRecipes, getAllRecipes, getRecipeById, editRecipe, deleteRecipe, uploadImage };