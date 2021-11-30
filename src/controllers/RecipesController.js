const statusCodes = require('http-status-codes');
const service = require('../services/RecipesService');

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
        console.log('error user controller', err.message);
        return next(err);
    }
};

module.exports = { registerRecipes };