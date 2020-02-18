const path = require("path");
const express = require("express");
const RecipesService = require("./recipes-service");

const recipesRouter = express.Router();
const jsonParser = express.json();

recipesRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    RecipesService.getAllRecipes(knexInstance)
      .then(recipes => {
        res.json(recipes);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get("db");
    const { username, recipename, ingredients, instructions } = req.body;
    const newRecipe = { username, recipename, ingredients, instructions };
    for (const [key, value] of Object.entries(newRecipe)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing ${key} from request body` }
        });
      }
    }
    RecipesService.createNewRecipe(knexInstance, newRecipe)
      .then(recipe => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${recipe.recipename}`))
          .json(recipe);
      })
      .catch(next);
  });

recipesRouter
  .route("/:recipe_id")
  .all((req, res, next) => {
    knexInstance = req.app.get("db");
    RecipesService.getByRecipename(knexInstance, req.params.recipe_id)
      .then(recipe => {
        if (!recipe) {
          return res.status(404).json({
            error: { message: "Recipe doesn't exist." }
          });
        }
        res.recipe = recipe;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(res.recipe);
  })
  .delete((req, res, next) => {
    knexInstance = req.app.get("db");
    RecipesService.deleteRecipe(knexInstance, req.params.recipe_id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { username, recipename, ingredients, instructions } = req.body;
    const recipeToUpdate = { username, recipename, ingredients, instructions };
    const numberOfValues = Object.values(recipeToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message:
            "Request body must contain either username, recipename, ingredients, or instructions."
        }
      });
    }
    RecipesService.updateRecipe(
      knexInstance,
      req.params.recipe_id,
      recipeToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = recipesRouter;
