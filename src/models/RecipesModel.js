const connection = require('./connection');

const recipes = 'recipes';

const registerRecipes = async (name, ingredients, preparation) => {
    const newRecipe = await connection()
        .then((db) => db.collection(recipes).insertOne({ name, ingredients, preparation }));
    return newRecipe;
};

module.exports = { registerRecipes };
