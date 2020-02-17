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

usersRouter.route("/:username").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  UsersService.getUserById(knexInstance, req.params.username)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          error: { message: "User doesn't exist" }
        });
      }
      res.json(user);
      next();
    })
    .catch(next);
});

module.exports = usersRouter;
