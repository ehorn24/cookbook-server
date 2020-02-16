const path = require("path");
const express = require("express");
const UsersService = require("./users-service");

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");

    UsersService.getAllUsers(knexInstance)
      .then(users => {
        res.json(users);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get("db");
    const { firstname, lastname, username, password } = req.body;
    const newUser = { firstname, lastname, username, password };
    for (const [key, value] of Object.entries(newUser)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing ${key} from request body` }
        });
      }
    }
    UsersService.createNewUser(knexInstance, newUser)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(next);
  });

module.exports = usersRouter;
