const path = require("path");
const express = require("express");
const UsersService = require("./users-service");
const md5 = require("md5");

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
    const {
      firstname,
      lastname,
      username,
      password,
      profilepicture,
      profilebio
    } = req.body;
    const newUser = {
      firstname,
      lastname,
      username,
      password: md5(password),
      profilepicture,
      profilebio
    };
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
          .location(path.posix.join(req.originalUrl, `/${user.username}`))
          .json(user);
      })
      .catch(next);
  });

usersRouter.route("/login").post(jsonParser, (req, res, next) => {
  knexInstance = req.app.get("db");
  const username = req.body.username;
  const password = req.body.password;
  const retUser = { username, password: md5(password) };
  UsersService.authUser(knexInstance, retUser.username)
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: "User doesn't exist"
        });
      } else if (
        user.username === retUser.username &&
        user.password === retUser.password
      ) {
        res.json("OK");
      } else {
        res.status(404).json({
          message: "Invalid credentials."
        });
      }
    })
    .catch(next);
});

usersRouter
  .route("/:user_id")
  .all((req, res, next) => {
    const knexInstance = req.app.get("db");
    UsersService.getById(knexInstance, req.params.user_id)
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
    const knexInstance = req.app.get("db");
    UsersService.deleteUser(knexInstance, req.params.user_id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get("db");
    const {
      firstname,
      lastname,
      username,
      password,
      profilepicture,
      profilebio
    } = req.body;
    const userToUpdate = {
      firstname: firstname !== "" ? firstname : undefined,
      lastname: lastname !== "" ? lastname : undefined,
      username: username !== "" ? username : undefined,
      password: password ? md5(password) : undefined,
      profilepicture: profilepicture !== "" ? profilepicture : undefined,
      profilebio: profilebio !== "" ? profilebio : undefined
    };

    const numberOfValues = Object.values(userToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message:
            "Request body must contain either first name, last name, username, password, or picture"
        }
      });
    }
    UsersService.updateUser(knexInstance, req.params.user_id, userToUpdate)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = usersRouter;
