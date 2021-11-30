const Joi = require('joi');
const statusCodes = require('http-status-codes');
const recipes = require('../models/RecipesModel');

const invalidEntries = 'Invalid entries. Try again.';

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

module.exports = { registerRecipes };