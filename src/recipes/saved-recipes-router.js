const path = require("path");
const express = require("express");
const SavedRecipesService = require("./saved-recipes-service");

const savedRecipesRouter = express.Router();
const jsonParser = express.json();

savedRecipesRouter
  .route("/:user_saved")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    SavedRecipesService.getRecipesForUser(knexInstance, req.params.user_saved)
      .then(sRecipes => {
        res.json(sRecipes);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get("db");
    const { recipe_id, user_saved } = req.body;
    const newSave = { recipe_id, user_saved };
    for (const [key, value] of Object.entries(newSave)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing ${key} from request body.` }
        });
      }
    }
    SavedRecipesService.saveRecipe(knexInstance, newSave)
      .then(sRecipe => {
        res.status(201).json(sRecipe);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    const knexInstance = req.app.get("db");
    const { recipe_id, user_saved } = req.body;
    SavedRecipesService.deleteSavedRecipe(knexInstance, recipe_id, user_saved)
      .then(x => res.status(204).end())
      .catch(next);
  });

module.exports = savedRecipesRouter;
