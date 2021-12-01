const Joi = require('joi');
const statusCodes = require('http-status-codes');
const recipes = require('../models/RecipesModel');

const invalidEntries = 'Invalid entries. Try again.';
const recipeNotFound = 'recipe not found';
const missingToken = 'missing auth token';
// const unauthorized = 'user not authorized';

const RecipesSchema = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
});

const validateError = (status, message) => ({
    status, 
    message,
});

const registerRecipes = (name, ingredients, preparation) => {
    const { error } = RecipesSchema.validate({ name, ingredients, preparation });
    if (error) throw validateError(statusCodes.BAD_REQUEST, invalidEntries);
    const newRecipe = recipes.registerRecipes(name, ingredients, preparation);
    return newRecipe;
};

const getAllRecipes = async () => {
    const allRecipes = await recipes.getAllRecipes();
    return allRecipes;
};

const getRecipeById = async (id) => {
    const recipeById = await recipes.getRecipeById(id);
    if (!recipeById) throw validateError(statusCodes.NOT_FOUND, recipeNotFound);
    return recipeById;
};

const editRecipe = async (id, recipeInfos, userInfo) => { 
    const { _id: userId } = userInfo;
    const recipe = await recipes.getRecipeById(id);
    if (!recipe) throw validateError(statusCodes.NOT_FOUND, recipeNotFound);    
    if (!userInfo) throw validateError(statusCodes.UNAUTHORIZED, missingToken);    

    const editedRecipe = await recipes.editRecipe(id, recipeInfos, userId);
    return editedRecipe;
};

const deleteRecipe = async (id, userInfo) => {
    if (!userInfo) throw validateError(statusCodes.UNAUTHORIZED, missingToken);
    const deletedRecipe = await recipes.deleteRecipe(id);
    return deletedRecipe;
};

const uploadImage = async (id, userInfo) => {
    const { _id: userId } = userInfo;
    if (!userInfo) throw validateError(statusCodes.UNAUTHORIZED, missingToken);
    const image = `localhost:3000/src/uploads/${id}.jpeg`;
    
    const uploadedImage = await recipes.uploadImage(id, image, userId);
    return uploadedImage;
};

module.exports = { 
    registerRecipes, getAllRecipes, getRecipeById, editRecipe, deleteRecipe, uploadImage };