const { ObjectId } = require('mongodb');
const connection = require('./connection');

const recipes = 'recipes';

const registerRecipes = async (name, ingredients, preparation) => {
    const newRecipe = await connection()
        .then((db) => db.collection(recipes).insertOne({ name, ingredients, preparation }));
    return newRecipe;
};

const getAllRecipes = async () => {
    const getRecipes = await connection()
    .then((db) => db.collection(recipes).find().toArray());
    const allRecipes = getRecipes.map(({ _id, name, preparation, ingredients, userId }) => 
    ({ _id, name, preparation, ingredients, userId }));

    return allRecipes;
};

const getRecipeById = async (id) => {    
   const validId = ObjectId.isValid(id);
   if (!validId) return null;

   const recipeById = await connection()
   .then((db) => db.collection(recipes).findOne({ _id: ObjectId(id) }));

   return recipeById;
};

module.exports = { registerRecipes, getAllRecipes, getRecipeById };
