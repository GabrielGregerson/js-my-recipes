const express = require('express');
const router = express.Router();
const path = require('path');

const recipes = require('../../../data/recipes.json');

router.get('/', (_, res) => {
  const recipesResult = recipes.map(({ id, title, image, prepTime, difficulty }) => ({
    id,
    title,
    image,
    prepTime,
    difficulty,
  }));
  res.json(recipesResult);
});

router.post('/recipe/add', (req, res) => {
  const newRecipe = req.body;

  newRecipe.id = recipes.length + 1;

  recipes.push(newRecipe);

  res.json(newRecipe);
});

router.get('/recipe/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const recipeResult = recipes.find((recipe) => recipe.id === id);

  if (recipeResult) {
    res.json(recipeResult);
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
});

module.exports = router;