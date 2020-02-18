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
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${user.id}`))
          .json(user);
      })
      .catch(next);
  });

usersRouter
  .route("/:username")
  .all((req, res, next) => {
    knexInstance = req.app.get("db");
    UsersService.getByUsername(knexInstance, req.params.username)
      .then(user => {
        if (!user) {
          return res.status(404).json({
            error: { message: "User doesn't exist" }
          });
        }
        res.user = user;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(res.user);
  })
  .delete((req, res, next) => {
    knexInstance = req.app.get("db");
    UsersService.deleteUser(knexInstance, req.params.username)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { firstname, lastname, username, password } = req.body;
    const userToUpdate = { firstname, lastname, username, password };
    const numberOfValues = Object.values(userToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message:
            "Request body must contain either first name, last name, username or password"
        }
      });
    }
    UsersService.updateUser(knexInstance, req.params.username, userToUpdate)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = usersRouter;
